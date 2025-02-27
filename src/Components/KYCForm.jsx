import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import '../assets/css/KYCForm.css';
import shape54 from '../assets/images/shape/shape-54.png';

const KYCForm = () => {
    const sigPad = useRef();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        businessName: '',
        businessEmail: '',
        businessAddress: '',
        postalCode: '',
        skypeId: '',
        phoneNumber: '',
        fccId: '',
        targetCountries: [],
        otherCountries: '',
        monthlyVolume: '',
        portsRequired: '',
        agentsRequired: '',
        switchVersion: '',
        campaign: '',
        clisRequired: '',
        productServices: '',
        nonCompliantCalls: '',
        scamCalls: '',
        tracebacks: '',
        ipAddresses: '',
        telemarketing: '',
        callDuration: '',
        notes: '',
        attachments: []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [signatureReady, setSignatureReady] = useState(false);

    // Focus on first error field
    useEffect(() => {
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField && firstErrorField !== 'signature' && firstErrorField !== 'submit' && firstErrorField !== 'targetCountries') {
            const element = document.querySelector(`[name="${firstErrorField}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.focus();
            }
        }
    }, [errors]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let updatedCountries = [...formData.targetCountries];
        if (checked) {
            updatedCountries.push(name);
        } else {
            updatedCountries = updatedCountries.filter(country => country !== name);
        }
        setFormData(prev => ({
            ...prev,
            targetCountries: updatedCountries
        }));
        
        // Clear error when user selects a country
        if (errors.targetCountries) {
            setErrors(prev => ({
                ...prev,
                targetCountries: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
    };

    const removeFile = (index) => {
        const updatedFiles = [...formData.attachments];
        updatedFiles.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            attachments: updatedFiles
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        const requiredFields = [
            'email', 'name', 'businessName', 'businessEmail', 'businessAddress',
            'postalCode', 'skypeId', 'monthlyVolume', 'portsRequired',
            'agentsRequired', 'switchVersion', 'campaign', 'productServices',
            'nonCompliantCalls', 'scamCalls', 'tracebacks', 'ipAddresses', 
            'telemarketing', 'callDuration'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (formData.businessEmail && !emailRegex.test(formData.businessEmail)) {
            newErrors.businessEmail = 'Please enter a valid business email address';
        }

        // Phone validation
        const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
        if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }

        // Target countries validation
        if (formData.targetCountries.length === 0 && !formData.otherCountries) {
            newErrors.targetCountries = 'Please select at least one country or specify other countries';
        }

        // Signature validation
        if (!sigPad.current || sigPad.current.isEmpty()) {
            newErrors.signature = 'Please provide your signature';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignatureBegin = () => {
        setSignatureReady(true);
        // Clear signature error if it exists
        if (errors.signature) {
            setErrors(prev => ({
                ...prev,
                signature: ''
            }));
        }
    };

    const clearSignature = () => {
        sigPad.current.clear();
        setSignatureReady(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            
            // Scroll to signature section if there's a signature error
            if (errors.signature) {
                const signatureSection = document.querySelector('.signature-section');
                if (signatureSection) {
                    signatureSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            
            return;
        }

        try {
            const signatureData = sigPad.current.toDataURL();
            const formDataToSubmit = new FormData();

            // Append all form fields
            Object.keys(formData).forEach(key => {
                if (key === 'targetCountries') {
                    formDataToSubmit.append(key, JSON.stringify(formData[key]));
                } else if (key === 'attachments') {
                    formData[key].forEach(file => {
                        formDataToSubmit.append('attachments', file);
                    });
                } else {
                    formDataToSubmit.append(key, formData[key]);
                }
            });

            // Append signature
            formDataToSubmit.append('signature', signatureData);

            // API call would go here
            // const response = await axios.post('/api/submit-kyc', formDataToSubmit);

            console.log('Form submitted successfully:', formDataToSubmit);
            setSubmitSuccess(true);
            // Optional: Reset form
            // setFormData(initialFormState);
            // sigPad.current.clear();

        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to submit form. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const targetCountryOptions = ['USA', 'Canada', 'United Kingdom', 'Australia'];

    return (
        <div className="contact-form-container">
            <div
                className="pattern-layer"
                style={{
                    backgroundImage: `url(${shape54})`,
                    backgroundRepeat: "no-repeat",
                    marginTop: "0px"
                }}
            >
                <div className="contact-form-wrapper">
                    <h2 className="form-title">KYC Information Form</h2>

                    {submitSuccess ? (
                        <div className="success-message">
                            <h3>Form Submitted Successfully!</h3>
                            <p>Thank you for submitting your information. We will review it and get back to you shortly.</p>
                            <button
                                className="new-form-button"
                                onClick={() => {
                                    setFormData({
                                        email: '',
                                        name: '',
                                        businessName: '',
                                        businessEmail: '',
                                        businessAddress: '',
                                        postalCode: '',
                                        skypeId: '',
                                        phoneNumber: '',
                                        fccId: '',
                                        targetCountries: [],
                                        otherCountries: '',
                                        monthlyVolume: '',
                                        portsRequired: '',
                                        agentsRequired: '',
                                        switchVersion: '',
                                        campaign: '',
                                        clisRequired: '',
                                        productServices: '',
                                        nonCompliantCalls: '',
                                        scamCalls: '',
                                        tracebacks: '',
                                        ipAddresses: '',
                                        telemarketing: '',
                                        callDuration: '',
                                        notes: '',
                                        attachments: []
                                    });
                                    setSubmitSuccess(false);
                                    clearSignature();
                                }}
                            >
                                Submit Another Form
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Basic Information Section */}
                            <div className="form-section">
                                <h3 className="section-title">Basic Information</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Email<span className="required">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.email && <div className="error-message">{errors.email}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Name<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.name ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.name && <div className="error-message">{errors.name}</div>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Your Business Name<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.businessName ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.businessName && <div className="error-message">{errors.businessName}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Your Business Email<span className="required">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="businessEmail"
                                            value={formData.businessEmail}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.businessEmail ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.businessEmail && <div className="error-message">{errors.businessEmail}</div>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Business address & Country<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="businessAddress"
                                            value={formData.businessAddress}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.businessAddress ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.businessAddress && <div className="error-message">{errors.businessAddress}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Postal Code<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.postalCode ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Skype ID<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="skypeId"
                                            value={formData.skypeId}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.skypeId ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.skypeId && <div className="error-message">{errors.skypeId}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                                            placeholder="+1 (123) 456-7890"
                                        />
                                        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        FCC 499 Filer ID if you are a telecom reseller
                                    </label>
                                    <input
                                        type="text"
                                        name="fccId"
                                        value={formData.fccId}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* Business Requirements Section */}
                            <div className="form-section">
                                <h3 className="section-title">Business Requirements</h3>

                                <div className="form-group">
                                    <label className="form-label">
                                        Your Target Countries<span className="required">*</span>
                                    </label>
                                    <div className="checkbox-group">
                                        {targetCountryOptions.map((country, index) => (
                                            <label key={index} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    name={country}
                                                    checked={formData.targetCountries.includes(country)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                {country}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="form-group" style={{ marginTop: '10px' }}>
                                        <label className="form-label">Other (describe)</label>
                                        <input
                                            type="text"
                                            name="otherCountries"
                                            value={formData.otherCountries}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                    {errors.targetCountries && <div className="error-message">{errors.targetCountries}</div>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Estimated Monthly Volume<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="monthlyVolume"
                                            value={formData.monthlyVolume}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.monthlyVolume ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.monthlyVolume && <div className="error-message">{errors.monthlyVolume}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Number of Ports Required<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="portsRequired"
                                            value={formData.portsRequired}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.portsRequired ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.portsRequired && <div className="error-message">{errors.portsRequired}</div>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Number agents for which you require a dialer<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="agentsRequired"
                                            value={formData.agentsRequired}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.agentsRequired ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.agentsRequired && <div className="error-message">{errors.agentsRequired}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            What is your Switch/Dialer Version?<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="switchVersion"
                                            value={formData.switchVersion}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.switchVersion ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.switchVersion && <div className="error-message">{errors.switchVersion}</div>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            What is the campaign you are working on?<span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="campaign"
                                            value={formData.campaign}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.campaign ? 'error' : ''}`}
                                            required
                                        />
                                        {errors.campaign && <div className="error-message">{errors.campaign}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            No of CLIs required if any
                                        </label>
                                        <input
                                            type="text"
                                            name="clisRequired"
                                            value={formData.clisRequired}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Compliance Section */}
                            <div className="form-section">
                                <h3 className="section-title">Compliance Information</h3>

                                <div className="form-group">
                                    <label className="form-label">
                                        Type of products/services that are being sold by those originating the calls (for compliance purposes)?<span className="required">*</span>
                                    </label>
                                    <textarea
                                        name="productServices"
                                        value={formData.productServices}
                                        onChange={handleInputChange}
                                        className={`form-textarea ${errors.productServices ? 'error' : ''}`}
                                        rows="4"
                                        placeholder="Describe the products/services that will be sold"
                                        required
                                    />
                                    {errors.productServices && <div className="error-message">{errors.productServices}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Do you have any customers/dialers intentionally making calls that are not compliant with TCPA, Robocall, Truth in Caller ID act, or any other rules or legislation applying to dialers?<span className="required">*</span>
                                    </label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="nonCompliantCalls"
                                                value="Yes"
                                                checked={formData.nonCompliantCalls === "Yes"}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            Yes
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="nonCompliantCalls"
                                                value="No"
                                                checked={formData.nonCompliantCalls === "No"}
                                                onChange={handleInputChange}
                                            />
                                            No
                                        </label>
                                    </div>
                                    {errors.nonCompliantCalls && <div className="error-message">{errors.nonCompliantCalls}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Do you have any customers/dialers making scam calls and/or causing tracebacks for scams including Social Security, CRA, IRS, pretending to be large companies (i.e. Amazon, Google)?<span className="required">*</span>
                                    </label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="scamCalls"
                                                value="Yes"
                                                checked={formData.scamCalls === "Yes"}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            Yes
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="scamCalls"
                                                value="No"
                                                checked={formData.scamCalls === "No"}
                                                onChange={handleInputChange}
                                            />
                                            No
                                        </label>
                                    </div>
                                    {errors.scamCalls && <div className="error-message">{errors.scamCalls}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        How many US Telecom or law enforcement tracebacks, if any, have you had in the past year?<span className="required">*</span>
                                    </label>
                                    <select
                                        name="tracebacks"
                                        value={formData.tracebacks}
                                        onChange={handleInputChange}
                                        className={`form-select ${errors.tracebacks ? 'error' : ''}`}
                                        required
                                    >
                                        <option value="">Choose</option>
                                        <option value="none">None</option>
                                        <option value="1-5">1-5</option>
                                        <option value="6-10">6-10</option>
                                        <option value="11-20">11-20</option>
                                        <option value="20+">More than 20</option>
                                    </select>
                                    {errors.tracebacks && <div className="error-message">{errors.tracebacks}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        IP Addresses you will be sending calls from (one per line)<span className="required">*</span>
                                    </label>
                                    <textarea
                                        name="ipAddresses"
                                        value={formData.ipAddresses}
                                        onChange={handleInputChange}
                                        className={`form-textarea ${errors.ipAddresses ? 'error' : ''}`}
                                        rows="4"
                                        placeholder="Enter one IP address per line"
                                        required
                                    />
                                    {errors.ipAddresses && <div className="error-message">{errors.ipAddresses}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        You here by adhere to follow Telemarketing standards and to send call with only Valid callback able CLI/ANI<span className="required">*</span>
                                    </label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="telemarketing"
                                                value="Yes"
                                                checked={formData.telemarketing === "Yes"}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            Yes
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="telemarketing"
                                                value="No"
                                                checked={formData.telemarketing === "No"}
                                                onChange={handleInputChange}
                                            />
                                            No
                                        </label>
                                    </div>
                                    {errors.telemarketing && <div className="error-message">{errors.telemarketing}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Have you been made aware that calls will be charged to minimum duration of 20 seconds to maintain 20 second ACD. Billing is 12/6<span className="required">*</span>
                                    </label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="callDuration"
                                                value="Yes"
                                                checked={formData.callDuration === "Yes"}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            Yes
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="callDuration"
                                                value="No"
                                                checked={formData.callDuration === "No"}
                                                onChange={handleInputChange}
                                            />
                                            No
                                        </label>
                                    </div>
                                    {errors.callDuration && <div className="error-message">{errors.callDuration}</div>}
                                </div>
                            </div>

                            {/* Additional Notes Section */}
                            <div className="form-section">
                                <h3 className="section-title">Additional Information</h3>

                                <div className="form-group">
                                    <label className="form-label">Any additional notes for how we may be of best help to you?</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="form-textarea"
                                        rows="4"
                                        placeholder="Enter any additional notes here"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Add File</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="file-input"
                                        id="file-upload"
                                        multiple
                                    />
                                    <label htmlFor="file-upload" className="file-label">
                                        Choose Files
                                    </label>
                                    {formData.attachments.length > 0 && (
                                        <div className="file-info">
                                            {formData.attachments.map((file, index) => (
                                                <div key={index} className="file-item">
                                                    {file.name}
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeFile(index)}
                                                        style={{ 
                                                            marginLeft: '10px', 
                                                            background: 'none', 
                                                            border: 'none', 
                                                            color: '#ff4444', 
                                                            cursor: 'pointer' 
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Signature Section */}
                            {/* Signature Section */}
<div className="form-section signature-section">
    <h3 className="section-title">Digital Signature</h3>

    <div className="form-group">
        <label className="form-label">
            Your Signature<span className="required">*</span>
        </label>
        <p style={{ marginBottom: '10px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Add your signature here - Click and drag your mouse to sign
        </p>
        <div 
            className={`signature-pad ${errors.signature ? 'error' : ''}`}
            style={{ 
                border: errors.signature ? '1px solid #ff4444' : '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                cursor: 'crosshair',
                width: '100%',
                height: '200px',
                backgroundColor: 'white'
            }}
        >
            <SignatureCanvas
                ref={sigPad}
                canvasProps={{
                    className: 'signature-canvas',
                    style: {
                        width: '100%',
                        height: '100%',
                        touchAction: 'none'
                    }
                }}
                backgroundColor="rgba(255, 255, 255, 0)"
                penColor="black"
                onBegin={handleSignatureBegin}
                minWidth={1}
                maxWidth={3}
                throttle={0}
                velocityFilterWeight={0.7}
                dotSize={() => 1.5}
                clearOnResize={false}
            />
            {!signatureReady && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'rgba(0, 0, 0, 0.3)',
                    fontSize: '16px',
                    pointerEvents: 'none',
                    textAlign: 'center',
                    width: '80%'
                }}>
                    Click and drag to sign here
                </div>
            )}
        </div>
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px' 
        }}>
            <button
                type="button"
                onClick={clearSignature}
                className="clear-signature"
            >
                Clear Signature
            </button>
            {signatureReady && (
                <span style={{ color: '#4CAF50' }}>
                    ✓ Signature captured
                </span>
            )}
        </div>
        {errors.signature && <div className="error-message">{errors.signature}</div>}
    </div>
</div>

                            {/* Submit Button */}
                            <div className="form-actions">
                                {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KYCForm;