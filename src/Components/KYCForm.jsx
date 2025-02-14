import React, { useState, useRef } from 'react';
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
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            attachments: files
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        const requiredFields = [
            'email', 'name', 'businessName', 'businessEmail', 'businessAddress',
            'postalCode', 'skypeId', 'monthlyVolume', 'portsRequired',
            'agentsRequired', 'switchVersion', 'campaign', 'productServices'
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

        // Target countries validation
        if (formData.targetCountries.length === 0 && !formData.otherCountries) {
            newErrors.targetCountries = 'Please select at least one country or specify other countries';
        }

        // Radio button validations
        const radioFields = ['nonCompliantCalls', 'scamCalls', 'telemarketing', 'callDuration'];
        radioFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Please select an option';
            }
        });

        // Signature validation
        if (!sigPad.current || sigPad.current.isEmpty()) {
            newErrors.signature = 'Please provide your signature';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        <>
        <div className="contact-form-container">
                <div
              className="pattern-layer"
              style={{
                backgroundImage: `url(${shape54})`,
                backgroundSize: "2000px 2000px", // Set width and height manually
                backgroundRepeat: "no-repeat", // Prevent repeating if needed
                marginTop:"0px"
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
                                setFormData({});
                                setSubmitSuccess(false);
                                sigPad.current.clear();
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
                                        Email<span className="required">*                                        </span>
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
                                        Switch/Dialer Version<span className="required">*</span>
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
                                        Campaign<span className="required">*</span>
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
                                        Number of CLIs Required
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
                                    Products/Services Being Sold<span className="required">*</span>
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
                                    Non-Compliant Calls<span className="required">*</span>
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
                                    Do you have customers/dialers making scam calls?<span className="required">*</span>
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
                                    Tracebacks in the past year<span className="required">*</span>
                                </label>
                                <select
                                    name="tracebacks"
                                    value={formData.tracebacks}
                                    onChange={handleInputChange}
                                    className={`form-select ${errors.tracebacks ? 'error' : ''}`}
                                    required
                                >
                                    <option value="">Select option</option>
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
                                    IP Addresses<span className="required">*</span>
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
                                    Telemarketing Standards Agreement<span className="required">*</span>
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
                        </div>

                        {/* Additional Notes Section */}
                        <div className="form-section">
                            <h3 className="section-title">Additional Information</h3>

                            <div className="form-group">
                                <label className="form-label">Additional Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    className="form-textarea"
                                    rows="4"
                                    placeholder="Any additional notes for how we may be of best help to you?"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Attachments</label>
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
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Signature Section */}
                        <div className="form-section signature-section">
                            <h3 className="section-title">Digital Signature</h3>

                            <div className="form-group">
                                <label className="form-label">
                                    Your Signature<span className="required">*</span>
                                </label>
                                <div className="signature-pad">
                                    <SignatureCanvas
                                        ref={sigPad}
                                        canvasProps={{
                                            width: 500,
                                            height: 200,
                                            className: 'signature-canvas'
                                        }}
                                        backgroundColor="rgb(255, 255, 255)"
                                    />
                                </div>
                                <div className="signature-actions">
                                    <button
                                        type="button"
                                        onClick={() => sigPad.current.clear()}
                                        className="clear-signature"
                                    >
                                        Clear Signature
                                    </button>
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
        </>
    );
};

export default KYCForm;