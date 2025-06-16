'use client';
const AddressCard = ({ address, onEdit, onDelete }) => {
    return (
        <div id='card'>
            <div id='info'>
                <h3>{address.street} {address.houseNumber} {address.officeOrRoom}</h3>
                <p>{address.city}, {address.region}, {address.country}</p>
            </div>
            <div id='actions'>
                <button onClick={onEdit}>Редактировать</button>
                <button onClick={onDelete}>Удалить</button>
            </div>
        </div>
    );
};

export default AddressCard;
