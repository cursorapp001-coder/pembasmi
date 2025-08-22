import React, { useState, useRef } from 'react';
import { User } from '../App';

// --- ICONS ---
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const SelectPhotoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const CropIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19M4.929 4.929L9.879 9.879m0 0L4.929 14.828m4.95-4.95l4.95-4.95" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;


const initialFormData = {
    noKtp: "3518170903860004",
    nama: "C.M.Firdaus Oiwobo",
    email: "teguh.advokat@pembasmi.org",
    nomerHp: "6281993868686",
    gelarDepan: "Dr.",
    gelarBelakang: "SH SHi MH SH Pid SH Pdt CFLS CLA ALC CMK",
    cv: "",
    tanggalLahir: "1986-03-09",
    jenisKelamin: "Laki - Laki",
    agama: "Kepercayaan",
    pendidikan: "S1",
    propinsi: "JAWA TIMUR",
    kota: "0 dipilih",
    alamatRumah: "Dsn.sebani Ds.tanjangrono",
    alamatKantor: "Dsn.sebani Ds.tanjangrono",
    ukuranKaos: "XL",
    alasanMendaftar: "Biar ikut maju",
    asalOrganisasi: {
        "PERADI - SAI": false,
        "AAI": false,
        "PERADI - SOHO": false,
        "IKADIN": false,
        "PERADI - RBA": false,
        "PERADIN": false,
    },
    lainnya: true,
    organisasiLainnya: "Lawyer Legal Konsultan Indonesia",
    // Image and File states
    pasFoto: "https://i.ibb.co/DfP7Knw3/IMG-20250822-WA0013.jpg",
    vaksin1: "https://via.placeholder.com/150x100.png?text=Vax+Cert+1",
    vaksin2: "https://via.placeholder.com/150x100.png?text=Vax+Cert+2",
    vaksin3: "https://via.placeholder.com/150x100.png?text=Vax+Cert+3",
    ktaDepan: "https://i.ibb.co/hLdtvBw/kta-front.png",
    ktaBelakang: "https://i.ibb.co/3W2Kx2y/kta-back.png",
    lampiranPernyataan: null as File | null,
    ktp: "https://i.ibb.co/KmfcnV8/ktp.png",
    skAdvokat: "https://i.ibb.co/L5k67p7/sk-advokat.png",
    beritaAcara: "https://i.ibb.co/YyY4Jhp/berita-acara.png",
    skPengurus: "https://i.ibb.co/4Z5vLzP/sk-pengurus.png",
    ijasah: null as File | null,
    sertifikatAsesor: "https://via.placeholder.com/150x100.png?text=Sertifikat+Asesor"
};

type FormData = typeof initialFormData;

// --- FORM COMPONENTS ---
const Section: React.FC<{ title: string; children: React.ReactNode; onSave: () => void; saveStatus: 'idle' | 'saving' | 'saved'; }> = ({ title, children, onSave, saveStatus }) => {
    const saveButtonContent = {
        idle: <><SaveIcon /> Save</>,
        saving: 'Saving...',
        saved: 'Saved!',
    };

    const saveButtonClasses = {
        idle: 'bg-blue-600 hover:bg-blue-700',
        saving: 'bg-gray-500 cursor-not-allowed',
        saved: 'bg-green-600',
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md mb-8">
            <header className="flex justify-between items-center p-3 border-b bg-gray-50 rounded-t-lg" style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd'}}>
                <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
                <button 
                    onClick={onSave} 
                    disabled={saveStatus !== 'idle'}
                    className={`text-white text-sm font-semibold py-1 px-3 rounded-md shadow-sm flex items-center transition-colors ${saveButtonClasses[saveStatus]}`}
                >
                    {saveButtonContent[saveStatus]}
                </button>
            </header>
            <div className="p-4 md:p-6">
                <div className="space-y-6">{children}</div>
            </div>
        </div>
    );
};

const FormField: React.FC<{ label: string; helper?: string; required?: boolean; children: React.ReactNode; isCheckbox?: boolean; }> = ({ label, helper, required, children, isCheckbox }) => (
    <div className="md:grid md:grid-cols-12 md:gap-4 items-start border-b border-gray-200 pb-4">
        <div className="md:col-span-3">
            <label className={`block text-sm font-medium text-gray-700 ${isCheckbox ? 'pt-1' : ''}`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        </div>
        <div className="mt-1 md:mt-0 md:col-span-9">
            {children}
            {helper && <p className="mt-1 text-xs text-gray-500">{helper}</p>}
        </div>
    </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs" />;
const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} rows={4} className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-md" />;
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs" />;

const RadioGroup: React.FC<{ options: string[]; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; inline?: boolean }> = ({ options, name, value, onChange, inline }) => (
    <div className={`flex ${inline ? 'flex-row flex-wrap gap-x-4 gap-y-2' : 'flex-col space-y-2'}`}>
        {options.map(option => (
            <label key={option} className="inline-flex items-center">
                <input type="radio" className="form-radio h-4 w-4 text-blue-600" name={name} value={option} checked={value === option} onChange={onChange} />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
            </label>
        ))}
    </div>
);

const ImageUpload: React.FC<{ label: string; imageSrc: string; imageId: string; onSelectClick: () => void; buttons?: ('select' | 'crop')[]; }> = ({ label, imageSrc, imageId, onSelectClick, buttons = ['select', 'crop'] }) => (
    <div>
        <span className="block text-sm font-bold mb-2">{label}</span>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-2 inline-block">
            <img src={imageSrc} alt={label} className="w-40 h-auto object-cover" />
        </div>
        <p className="text-xs text-gray-500 mt-1">{imageId}</p>
        <div className="mt-2 flex items-center space-x-2">
            {buttons.includes('select') && (
                 <button onClick={onSelectClick} className="bg-white text-gray-700 text-xs font-semibold py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center">
                    <SelectPhotoIcon /> Select Photo{buttons.length > 1 ? '' : 's'}
                </button>
            )}
            {buttons.includes('crop') && (
                <button onClick={() => alert('Fungsi crop belum tersedia.')} className="bg-white text-gray-700 text-xs font-semibold py-1 px-2 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center">
                    <CropIcon /> Crop Foto
                </button>
            )}
        </div>
    </div>
);


const CheckboxGroup: React.FC<{ options: string[]; name: string; value: Record<string, boolean>; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ options, name, value, onChange }) => (
    <div className="grid grid-cols-2 gap-4">
        {options.map(option => (
            <label key={option} className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" name={option} checked={!!value[option]} onChange={onChange} />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
            </label>
        ))}
    </div>
);

// New component for file uploads that are not images
const FileUpload: React.FC<{ label: string; file: File | null; onSelectClick: () => void; helper?: string; }> = ({ label, file, onSelectClick, helper }) => (
    <div>
        <div className="text-sm text-gray-800 p-2 rounded-md border bg-gray-50">
           {file ? file.name : "No file selected"}
        </div>
        <button onClick={onSelectClick} className="mt-2 bg-white text-gray-700 text-sm font-semibold py-1 px-3 rounded-md border border-gray-300 hover:bg-gray-50">Select File</button>
        {helper && <p className="mt-1 text-xs text-gray-500">{helper}</p>}
    </div>
);


const UpdateProfile: React.FC<{ user: User | null }> = ({ user }) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({
        general: 'idle',
        kta: 'idle',
        dokumen: 'idle',
        pendidikan: 'idle',
    });

    // Create a ref for each file input
    const fileInputRefs = {
        pasFoto: useRef<HTMLInputElement>(null),
        vaksin1: useRef<HTMLInputElement>(null),
        vaksin2: useRef<HTMLInputElement>(null),
        vaksin3: useRef<HTMLInputElement>(null),
        ktaDepan: useRef<HTMLInputElement>(null),
        ktaBelakang: useRef<HTMLInputElement>(null),
        lampiranPernyataan: useRef<HTMLInputElement>(null),
        ktp: useRef<HTMLInputElement>(null),
        skAdvokat: useRef<HTMLInputElement>(null),
        beritaAcara: useRef<HTMLInputElement>(null),
        skPengurus: useRef<HTMLInputElement>(null),
        ijasah: useRef<HTMLInputElement>(null),
        sertifikatAsesor: useRef<HTMLInputElement>(null),
    };

    const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
        ref.current?.click();
    };

    const handleSave = (section: string) => {
        setSaveStatus(prev => ({ ...prev, [section]: 'saving' }));
        console.log(`Saving data for ${section}:`, formData);
        setTimeout(() => {
            setSaveStatus(prev => ({ ...prev, [section]: 'saved' }));
            setTimeout(() => {
                setSaveStatus(prev => ({ ...prev, [section]: 'idle' }));
            }, 2000);
        }, 1000);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, [fieldName]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, [fieldName]: file }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            asalOrganisasi: { ...prev.asalOrganisasi, [name]: checked }
        }));
    };

    const handleLainnyaCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, lainnya: e.target.checked }));
    };


    return (
        <div className="bg-gray-100 p-4 font-sans">
            <nav className="text-sm mb-4 flex items-center text-gray-500">
                <a href="#" className="hover:text-blue-600 flex items-center"><HomeIcon /></a>
                <ChevronRightIcon />
                <a href="#" className="hover:text-blue-600">Profile</a>
                <ChevronRightIcon />
                <span className="font-semibold text-gray-700">Update Profile</span>
            </nav>

            <Section title="General Info" onSave={() => handleSave('general')} saveStatus={saveStatus.general}>
                <FormField label="No. KTP" required><Input name="noKtp" value={formData.noKtp} onChange={handleChange} /></FormField>
                <FormField label="Foto" required>
                    <ImageUpload label="Pas Foto" imageSrc={formData.pasFoto} imageId="1002529715" onSelectClick={() => triggerFileInput(fileInputRefs.pasFoto)} />
                    <input type="file" ref={fileInputRefs.pasFoto} className="hidden" onChange={(e) => handleImageChange(e, 'pasFoto')} accept="image/*" />
                </FormField>
                <FormField label="Nama" helper="Nama lengkap, tanpa gelar" required><Input name="nama" value={formData.nama} onChange={handleChange} /></FormField>
                <FormField label="Email" helper="Gunakan Email yg terdaftar di e-Court" required><Input name="email" value={formData.email} onChange={handleChange} /></FormField>
                <FormField label="Nomer HP" required><Input name="nomerHp" value={formData.nomerHp} onChange={handleChange} /></FormField>
                <FormField label="Gelar Depan" helper="Gelar Adv. Sudah otomatis. Biarkan kosong bila tanpa gelar lain."><Input name="gelarDepan" value={formData.gelarDepan} onChange={handleChange} /></FormField>
                <FormField label="Gelar Belakang"><Input name="gelarBelakang" value={formData.gelarBelakang} onChange={handleChange} /></FormField>
                <FormField label="Curriculum Vitae" helper="Riwayat hidup wajib diisi" required><TextArea name="cv" value={formData.cv} onChange={handleChange} /></FormField>
                <FormField label="Tanggal Lahir" required>
                    <div className="flex items-center space-x-2">
                        <div className="relative sm:max-w-xs w-full">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><CalendarIcon /></div>
                           <input type="date" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} className="block w-full pl-10 text-sm border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <button onClick={() => setFormData(prev => ({...prev, tanggalLahir: initialFormData.tanggalLahir}))} className="bg-gray-200 text-gray-700 text-sm font-semibold py-2 px-3 rounded-md border border-gray-300 hover:bg-gray-300">Reset</button>
                    </div>
                </FormField>
                <FormField label="Jenis Kelamin"><RadioGroup options={['Laki - Laki', 'Perempuan']} name="jenisKelamin" value={formData.jenisKelamin} onChange={handleRadioChange} inline /></FormField>
                <FormField label="Agama"><RadioGroup options={['Islam', 'Protestan', 'Katholik', 'Hindu', 'Budha', 'Kepercayaan']} name="agama" value={formData.agama} onChange={handleRadioChange} inline /></FormField>
                <FormField label="Pendidikan Terakhir"><RadioGroup options={['S1', 'S2 (Sedang Berlangsung)', 'S2 (Lulus)', 'S3 (Sedang Berlangsung)', 'S3 (Lulus)']} name="pendidikan" value={formData.pendidikan} onChange={handleRadioChange} /></FormField>
                <FormField label="Propinsi"><Select name="propinsi" value={formData.propinsi} onChange={handleChange}><option>JAWA TIMUR</option></Select></FormField>
                <FormField label="Kab / Kota"><Select name="kota" value={formData.kota} onChange={handleChange}><option>0 dipilih</option></Select></FormField>
                <FormField label="Alamat Rumah"><TextArea name="alamatRumah" value={formData.alamatRumah} onChange={handleChange} /></FormField>
                <FormField label="Alamat Kantor"><TextArea name="alamatKantor" value={formData.alamatKantor} onChange={handleChange} /></FormField>
                <FormField label="Sertifikat Vaksin ke-1">
                    <ImageUpload label="" imageSrc={formData.vaksin1} imageId="" onSelectClick={() => triggerFileInput(fileInputRefs.vaksin1)} />
                    <input type="file" ref={fileInputRefs.vaksin1} className="hidden" onChange={(e) => handleImageChange(e, 'vaksin1')} accept="image/*" />
                </FormField>
                <FormField label="Sertifikat Vaksin ke-2">
                    <ImageUpload label="" imageSrc={formData.vaksin2} imageId="" onSelectClick={() => triggerFileInput(fileInputRefs.vaksin2)} />
                    <input type="file" ref={fileInputRefs.vaksin2} className="hidden" onChange={(e) => handleImageChange(e, 'vaksin2')} accept="image/*" />
                </FormField>
                <FormField label="Sertifikat Vaksin ke-3">
                    <ImageUpload label="" imageSrc={formData.vaksin3} imageId="" onSelectClick={() => triggerFileInput(fileInputRefs.vaksin3)} />
                    <input type="file" ref={fileInputRefs.vaksin3} className="hidden" onChange={(e) => handleImageChange(e, 'vaksin3')} accept="image/*" />
                </FormField>
                <FormField label="Ukuran Kaos"><RadioGroup options={['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']} name="ukuranKaos" value={formData.ukuranKaos} onChange={handleRadioChange} inline /></FormField>
                <FormField label="Alasan mendaftar e-Lawyer" required><Input name="alasanMendaftar" value={formData.alasanMendaftar} onChange={handleChange} /></FormField>
            </Section>

            <Section title="Data KTA" onSave={() => handleSave('kta')} saveStatus={saveStatus.kta}>
                <FormField label="Foto KTA lama (Depan)" helper="Bila hilang / rusak upload SK pengacara" required>
                    <ImageUpload label="" imageSrc={formData.ktaDepan} imageId="1000133720" onSelectClick={() => triggerFileInput(fileInputRefs.ktaDepan)} />
                    <input type="file" ref={fileInputRefs.ktaDepan} className="hidden" onChange={(e) => handleImageChange(e, 'ktaDepan')} accept="image/*" />
                </FormField>
                <FormField label="Foto KTA Lama (Belakang)" helper="Bila hilang / rusak upload SK pengacara">
                    <ImageUpload label="" imageSrc={formData.ktaBelakang} imageId="1000165045" onSelectClick={() => triggerFileInput(fileInputRefs.ktaBelakang)} />
                    <input type="file" ref={fileInputRefs.ktaBelakang} className="hidden" onChange={(e) => handleImageChange(e, 'ktaBelakang')} accept="image/*" />
                </FormField>
                <FormField label="Upload Lampiran Pernyataan">
                    <FileUpload 
                        label="Lampiran Pernyataan" 
                        file={formData.lampiranPernyataan} 
                        onSelectClick={() => triggerFileInput(fileInputRefs.lampiranPernyataan)}
                        helper="Lampiran pernyataan bisa di download disini : https://officiummobile.com/files/file/data-web-1/data-user-1/907b4008fde79752fe7030837a166c2c/4710ec800df1c862f41740a26f2e063f.pdf" 
                    />
                    <input type="file" ref={fileInputRefs.lampiranPernyataan} className="hidden" onChange={(e) => handleFileChange(e, 'lampiranPernyataan')} />
                </FormField>
                <FormField label="Asal Organisasi" isCheckbox>
                    <div className="space-y-4">
                        <CheckboxGroup options={["PERADI - SAI", "PERADI - RBA", "PERADI - SOHO", "IKADIN", "AAI", "PERADIN"]} name="asalOrganisasi" value={formData.asalOrganisasi} onChange={handleCheckboxChange} />
                        <div className="flex items-center">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" checked={formData.lainnya} onChange={handleLainnyaCheckbox} />
                                <span className="ml-2 text-sm text-gray-700">Lainnya :</span>
                            </label>
                            <Input type="text" name="organisasiLainnya" value={formData.organisasiLainnya} onChange={handleChange} disabled={!formData.lainnya} className="ml-2"/>
                        </div>
                    </div>
                </FormField>
            </Section>

            <Section title="Dokumen" onSave={() => handleSave('dokumen')} saveStatus={saveStatus.dokumen}>
                <FormField label="KTP" required>
                    <ImageUpload label="" imageSrc={formData.ktp} imageId="1002549368" onSelectClick={() => triggerFileInput(fileInputRefs.ktp)} />
                     <input type="file" ref={fileInputRefs.ktp} className="hidden" onChange={(e) => handleImageChange(e, 'ktp')} accept="image/*" />
                </FormField>
                <FormField label="SK. Advokat/Pengacara" required>
                    <ImageUpload label="" imageSrc={formData.skAdvokat} imageId="1002549382" buttons={['select']} onSelectClick={() => triggerFileInput(fileInputRefs.skAdvokat)} />
                    <input type="file" ref={fileInputRefs.skAdvokat} className="hidden" onChange={(e) => handleImageChange(e, 'skAdvokat')} accept="image/*" />
                </FormField>
                <FormField label="Berita Acara Sumpah" helper="Bila tidak memiliki upload KTA Lama" required>
                    <ImageUpload label="" imageSrc={formData.beritaAcara} imageId="1002549387" buttons={['select']} onSelectClick={() => triggerFileInput(fileInputRefs.beritaAcara)} />
                    <input type="file" ref={fileInputRefs.beritaAcara} className="hidden" onChange={(e) => handleImageChange(e, 'beritaAcara')} accept="image/*" />
                </FormField>
                <FormField label="SK. Pengurus dan Kurator">
                    <ImageUpload label="" imageSrc={formData.skPengurus} imageId="1002549379" buttons={['select']} onSelectClick={() => triggerFileInput(fileInputRefs.skPengurus)} />
                    <input type="file" ref={fileInputRefs.skPengurus} className="hidden" onChange={(e) => handleImageChange(e, 'skPengurus')} accept="image/*" />
                </FormField>
                <FormField label="Upload Ijasah" required>
                     <FileUpload 
                        label="Ijasah" 
                        file={formData.ijasah} 
                        onSelectClick={() => triggerFileInput(fileInputRefs.ijasah)}
                    />
                    <input type="file" ref={fileInputRefs.ijasah} className="hidden" onChange={(e) => handleFileChange(e, 'ijasah')} />
                </FormField>
            </Section>

            <Section title="Pendidikan Lanjutan" onSave={() => handleSave('pendidikan')} saveStatus={saveStatus.pendidikan}>
                 <FormField label="Sertifikat Asesor">
                    <ImageUpload label="" imageSrc={formData.sertifikatAsesor} imageId="" buttons={['select']} onSelectClick={() => triggerFileInput(fileInputRefs.sertifikatAsesor)} />
                    <input type="file" ref={fileInputRefs.sertifikatAsesor} className="hidden" onChange={(e) => handleImageChange(e, 'sertifikatAsesor')} accept="image/*" />
                </FormField>
            </Section>

        </div>
    );
};

export default UpdateProfile;