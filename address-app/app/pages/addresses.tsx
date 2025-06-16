
'use client';

import React, { useEffect, useState } from 'react';
import { fetchAddresses, createAddress, updateAddress, deleteAddress, exportAddressesJson, exportAddressesCsv, parseAddress } from '../services/apiService';
import AddressCard from '../components/AddressCard';
import AddressModal from '../components/AddressModal';
import AddressFilters from '../components/AddressFilters';
import Pagination from '../components/Pagination';
import '../styles/AddressesPage.css';
import '../styles/AddressCards.css';

const AddressesPage = () => {

    const filt = {
        rawInput: "",
        street: "",
        city: "",
        region: "",
        country: "",
        houseNumber: "",
        pageSize: 10,
        pageNumber: 1
    };

    const [addresses, setAddresses] = useState({});
    const [filters, setFilters] = useState(filt);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const loadAddresses = async (filters:any) => {
        try {
            const data = await fetchAddresses(filters);
            setAddresses(data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        loadAddresses(filters);
    }, []);

    useEffect(() => {
        loadAddresses(filters);
    }, [filters]);

    const openModal = (address = null) => {
        setSelectedAddress(address);
        setIsModalOpen(true);
    };

    const handleCreateOrUpdateAddress = async (addressData: any) => {
        try {
            if (selectedAddress) {
                await updateAddress(selectedAddress.id, addressData);
            } else {
                await createAddress(addressData);
            }
            console.log('Address created/updated successfully');
            loadAddresses(filters);
            setIsModalOpen(false); 
        } catch (error) {
            console.error('Error handling address:', error);
        }
    };    
    
    const handleSearch = async (filters: any) => {
        setFilters(filters);
    };
    const handleDelete = async (id: string) => {
        try{
            await deleteAddress(id);
            loadAddresses(filters);
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    const handleExportJson = async () => {
        await exportAddressesJson(filters);
    };

    const handleExportCsv = async () => {
        await exportAddressesCsv(filters);
    };

    const handleParseAddress = async (rawAddress: any) => {
        try{
            await parseAddress(rawAddress);
            loadAddresses(filters);
            setIsModalOpen(false); 
        } catch (error) {
            console.error('Error handling address:', error);
        }
    };

    return (
        <div id='addresses-page'>
            <h1 id='title'>Адреса</h1>
            <AddressFilters  filt={filters} onSearchClick={handleSearch}/>
            <div id='addresses-actions'>
                <button id='add-address' onClick={() => openModal()}>Добавить адрес</button>
                <button onClick={handleExportJson}>Экспорт в JSON</button>
                <button onClick={handleExportCsv}>Экспорт в CSV</button>
            </div>
            <div>
                {!!(addresses.items) ? addresses.items.map((address) => (
                    <AddressCard
                        key={address.id}
                        address={address}
                        onDelete={() => handleDelete(address.id)}
                        onEdit={() => openModal(address)}
                    />
                )) : ""}
            </div>

            <Pagination 
                currentPage={addresses.pageNumber}
                totalPages={Math.ceil(addresses.totalCount/addresses.pageSize)}
                onPageChange={(page) => setFilters((prev) => ({ ...prev, pageNumber: page }))}
            />
            {isModalOpen && (
                <AddressModal
                    address={selectedAddress}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateOrUpdateAddress}
                    onSubmitRaw={handleParseAddress}
                />
            )}
        </div>
    );
};

export default AddressesPage;
