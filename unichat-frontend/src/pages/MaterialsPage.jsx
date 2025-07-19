// src/pages/MaterialsPage.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { getMaterials, uploadMaterial } from '../services/materials';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const MaterialsPage = () => {
    const { user } = useAuth();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchMaterials = async () => {
        try {
            const response = await getMaterials();
            setMaterials(response.data);
        } catch {
            setError('Failed to fetch materials.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Course Materials</CardTitle>
                    <CardDescription>Find lecture notes, syllabi, and other resources.</CardDescription>
                </CardHeader>
            </Card>

            {user.role === 'faculty' && <UploadMaterialForm onUploadSuccess={fetchMaterials} />}

            <Card>
                <CardHeader>
                    <CardTitle>Available Materials</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && materials.map(material => (
                        <MaterialCard key={material._id} material={material} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

const UploadMaterialForm = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!file || !title || !course) {
            setError('Please fill all fields and select a file.');
            return;
        }
        const formData = new FormData();
        formData.append('attachment', file);
        formData.append('title', title);
        formData.append('course', course);

        setIsUploading(true);
        try {
            await uploadMaterial(formData);
            onUploadSuccess();
            setTitle(''); setCourse(''); setFile(null);
        } catch (err) {
            setError(err?.response?.data?.message || 'Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload New Material</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardContent>
                    <Input placeholder="Course Code (e.g., CS101)" value={course} onChange={e => setCourse(e.target.value)} />
                    <Input placeholder="Material Title (e.g., Week 1 Lecture Notes)" value={title} onChange={e => setTitle(e.target.value)} />
                    <Input type="file" onChange={e => setFile(e.target.files[0])} />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" disabled={isUploading}>{isUploading ? 'Uploading...' : 'Upload'}</Button>
                </CardContent>
            </form>
        </Card>
    );
};

UploadMaterialForm.propTypes = {
    onUploadSuccess: PropTypes.func.isRequired
};

const MaterialCard = ({ material }) => {
    const downloadUrl = `${import.meta.env.VITE_API_URL.replace('/api', '')}/${material.filePath}`;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{material.title}</CardTitle>
                <CardDescription>Course: {material.course}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">Uploaded by: {material.uploadedBy.name}</p>
                <Button asChild className="mt-4 w-full">
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Download</a>
                </Button>
            </CardContent>
        </Card>
    );
};

MaterialCard.propTypes = {
    material: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        filePath: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        course: PropTypes.string.isRequired,
        uploadedBy: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default MaterialsPage;
