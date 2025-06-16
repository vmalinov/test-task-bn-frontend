'use client';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import { createAddress, updateAddress } from '../services/apiService';
import { useForm } from 'react-hook-form';

const AddressModal = ({ address, onClose, onSubmit, onSubmitRaw }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (address) {
            setIsEditing(true);
            setValue("rawInput", "");
            setValue("street", address.street);
            setValue("id", address.id);
            setValue("city", address.city);
            setValue("region", address.region);
            setValue("country", address.country);
            setValue("houseNumber", address.houseNumber);
            setValue("officeOrRoom", address.officeOrRoom);
            setValue("version", address.version);
        }
    }, [address, setValue]);

    const onSubmitClick = (data) => {
        onSubmit(data);
        onClose();
    };

    return (
        <Modal id='details-modal' ariaHideApp={false} isOpen={true} onRequestClose={onClose}>
            {!isEditing ? <h2>Добавить новый адрес</h2> : <h2>Редактировать адрес</h2>}
            {!isEditing ?
            <>
                <form  onSubmit={handleSubmit(onSubmitRaw)}>
                    <input id='raw-input' {...register("rawAddress")} placeholder='Введите адрес строкой' />
                    <button type="submit">{'Добавить'}</button>
                </form>
                <h3>или</h3>
                <br/>
            </> : ''}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("country")} placeholder="Страна" />                
                <input {...register("region")} placeholder="Область" />
                <input {...register("city")} placeholder="Город" />
                <input {...register("street")} placeholder="Улица" />
                <input {...register("houseNumber")} placeholder="Номер дома" />
                <input {...register("officeOrRoom")} placeholder="Квартира/Офис/Кабинет" />
                <input {...register("rawInput")} style={{ display: 'none' }} />
                <input {...register("version")} style={{ display: 'none' }} />
                <button type="submit">{isEditing ? 'Редактировать' : 'Добавить'}</button>
            </form>
            <button onClick={onClose}>Закрыть</button>
        </Modal>
    );
};

export default AddressModal;
