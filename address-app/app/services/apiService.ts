
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { toast } from 'react-toastify';

export const fetchAddresses = async (filters: any) => {
    try {
       const response = await fetch(`${apiUrl}/api/address/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters),
        });
        if (!response.ok) {
             throw  await parseError(response);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        toast.error('Произошла ошибка при получении адресов\n' + error.message);
        throw error;
    }
};

export const createAddress = async (data: any) => {
    try {
        const response = await fetch(`${apiUrl}/api/address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
             throw await parseError(response);
        }
        toast.success('Адрес создан успешно');

        return await response.json();
    } catch (error) {
        console.error(error);
        toast.error('Произошла ошибка при создании адреса\n' + error.message);
        throw error;
    }
};

export const updateAddress = async (id: string, data: any) => {
    try {
        const response = await fetch(`${apiUrl}/api/address/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status === 204) {
            
            toast.success('Адрес обновлен успешно');
            return null;
        }
        if (!response.ok) {
             throw await parseError(response);
        }
        
    } catch (error) {
        console.error(error);
        toast.error('Произошла ошибка при обновлении адреса. ' + error.message);
        throw error;
    }
};

export const deleteAddress = async (id: string) => {
    try {
        const response = await fetch(`${apiUrl}/api/address/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            toast.success('Адрес удалён успешно');
            return;
        }

        if (!response.ok) {
            throw await parseError(response);
        }
    } catch (error) {
        console.error(error);
        toast.error('Произошла ошибка при удалении адреса\n' + error.message);
        throw error;
    }
};

export const exportAddressesJson = async (filters: any) => {
    const query = new URLSearchParams(filters).toString();
    const url = `${apiUrl}/api/address/export/json?${query}`;
    await downloadFile(url, 'addresses.json');
};

export const exportAddressesCsv = async (filters: any) => {
    const query = new URLSearchParams(filters).toString();
    const url = `${apiUrl}/api/address/export/csv?${query}`;
    await downloadFile(url, 'addresses.csv');
};

export const parseAddress = async (rawAddress: any) => {
    try {
        const response = await fetch(`${apiUrl}/api/address/parse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rawAddress),
        });

        if (!response.ok) {
            throw await parseError(response);
        }

        const parsed = await response.json();
        toast.success('Адрес успешно распознан и сохранён');
        return parsed;
    } catch (error) {
        console.error(error);
        toast.error('Ошибка при распознавании адреса\n' + error.message);
        throw error;
    }
};

export const fetchStats = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/address/stats`);
        if (!response.ok) {
            throw await parseError(response);
        }
        return await response.json(); 
    } catch (error) {
        console.error(error);
        toast.error('Произошла ошибка при получении статистики\n' + error.message);
        throw error;
    }
};

const parseError = async (response: Response): Promise<Error> => {
    let message = '';
    try {
        const data = await response.json();
        if (data.errors) {
            const errorMessages = Object.entries(data.errors)
                .flatMap(([field, messages]) => messages)
                .join('\n');
            message = errorMessages;
        } else {
            message = data.message || data.title || message || data.error;
        }
    } catch {
    }

    return new Error(message);
};

const downloadFile = async (url: string, fileName: string) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw await parseError(response);
        }

        const blob = await response.blob();
        const urlObject = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = urlObject;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(`Файл "${fileName}" успешно загружен`);
    } catch (error) {
        console.error(error);
        toast.error('Ошибка при экспорте файла\n' + error.message);
        throw error;
    }
};