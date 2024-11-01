"use client"
import React, { useEffect, useState } from 'react';
import styles from './editProfile.module.scss';
import { BsPersonFillAdd } from 'react-icons/bs';
import style from "./style.module.css"
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/Axios/axios';
import { useAppDispatch } from '@/app/Hooks/useAppDispatch';
import { fetchuser } from '@/app/Store/Reducer/UserSlice';

interface EditProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const router = useRouter();
    const dispatch=useAppDispatch()

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            const fetchProfileData = async () => {
                try {
                    const response = await axiosInstance.get(`api/users/${localStorage.getItem('userId')}`);
                    if (response.status === 200) {
                        const userData = response.data.user;
                        setName(userData.name);
                        setUsername(userData.username);
                        setEmail(userData.email);
                        setBio(userData.bio);
                        setPreviewImage(userData.profilePic);
                    }
                } catch (error) {
                    console.log('Error fetching profile data:', error);
                }
            };
            fetchProfileData();
        }
    }, [isOpen]);

    const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePic(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('bio', bio);
            if (profilePic) formData.append('profilePic', profilePic);

            const response = await axiosInstance.patch(`api/users/${localStorage.getItem('userId')}`, formData);
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.user));

                onClose();
                dispatch(fetchuser())
            }
        } catch (error) {
            console.log('Error updating profile:', error);

        }
    };

    if (!isOpen) return null;

    return (
        <div className={style["EP-overlay"]}>
            <div className={style["EP-container"]}>
                <button onClick={onClose} className={style["EP-close-btn"]}>
                    ✕
                </button>

                <form className={style["EP-form"]} onSubmit={handleSubmit}>
                    <div className={style["EP-form-group"]}>
                        <label htmlFor="name" className={style['label']}>Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={style['input']}
                        />

                        <div className={style["EP-profile-pic-container"]}>
                            <button onClick={handleImageUpload}>
                                <BsPersonFillAdd size={24} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                className={style['input']}
                            />
                            {previewImage && (
                                <div className={style["EP-image-preview"]}>
                                    <img src={previewImage} alt="Profile Preview" className={style['EP-img']}/>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className={style["EP-form-group"]}>
                        <label htmlFor="username" className={style['label']}>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={style['input']}
                        />
                    </div>

                    <div className={style["EP-form-group"]}>
                        <label htmlFor="bio" className={style['label']}>Bio</label>
                        <input
                            type="text"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className={style['input']}
                        />
                    </div>

                    <div className={style["EP-form-group"]}>
                        <label htmlFor="email" className={style['label']}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={style['input']}
                        />
                    </div>

                    <button type="submit" className={style["EP-submit-btn"]}>
                        Done
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;