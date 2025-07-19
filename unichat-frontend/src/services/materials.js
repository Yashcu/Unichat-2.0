import api from './api';

export const getMaterials = (course = '') => {
    return api.get(`/materials?course=${course}`);
};

export const uploadMaterial = (formData) => {
    return api.post('/materials/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
