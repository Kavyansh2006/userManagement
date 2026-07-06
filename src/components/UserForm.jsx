
import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Dropdown from "./Dropdown";

import { useNavigate, useLocation } from "react-router-dom";
import { validateForm } from "../utils/validation";

import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../redux/userSlice";

import { customList } from "country-codes-list";
import { getStates } from "../services/api";

function UserForm() {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);

  
const editData = location.state;
const isEditMode = location.pathname === "/edit-user";


  const [states, setStates] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "",
    state: "",
    city: "",
    dialCode: "",
    mobile: "",
    team: "",
    department: "",
  });

  

useEffect(() => {
  if (isEditMode && editData) {
    setFormData(editData);
    setOriginalData(editData);
  } else {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      country: "",
      state: "",
      city: "",
      dialCode: "",
      mobile: "",
      team: "",
      department: "",
    });

    setOriginalData({});
  }
}, [isEditMode, editData]);



  const [originalData, setOriginalData] = useState({});
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  //  COUNTRY DATA
  const countryMap = customList("countryNameEn", "{countryCallingCode}");

  const countriesData = Object.entries(countryMap).map(
    ([name, code]) => ({
      name,
      dialCode: "+" + code.split(",")[0],
    })
  );

  //  PREFILL EDIT
  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setOriginalData(editData);   // ✅ store original
    }
  }, [editData]);

  //  FETCH STATES
  useEffect(() => {
    const fetchStates = async () => {
      if (formData.country) {
        const data = await getStates(formData.country);
        setStates(data);
      } else {
        setStates([]);
      }
    };

    fetchStates();
  }, [formData.country]);

  //  HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      const selected = countriesData.find((c) => c.name === value);

      setFormData({
        ...formData,
        country: value,
        state: "",
        city: "",
        dialCode: selected ? selected.dialCode : "",
      });

    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //  CHECK IF DATA CHANGED
  const isChanged =
    JSON.stringify(formData) !== JSON.stringify(originalData);

  //  HANDLE BACK
  const handleBack = () => {
    if (isChanged) {
      setShowModal(true);
    } else {
      navigate("/");
    }
  };

  //  CONFIRM DISCARD
  const confirmDiscard = () => {
    setShowModal(false);
    navigate("/");
  };

  //  CANCEL MODAL
  const cancelDiscard = () => {
    setShowModal(false);
  };

  //  SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    //  EMAIL DUPLICATE
    const emailExists = users.some((user) => {
      if (!user.email) return false;

      if (isEditMode) {
        return (
          user.email.toLowerCase() === formData.email.toLowerCase() &&
          user.id !== formData.id
        );
      }

      return user.email.toLowerCase() === formData.email.toLowerCase();
    });

    if (emailExists) {
      validationErrors.email = "Email already exists";
    }

    //  STATE REQUIRED
    if (states.length > 0 && !formData.state) {
      validationErrors.state = "State is required for selected country";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      if (isEditMode) {
        dispatch(updateUser(formData));
      } else {
        dispatch(addUser({
          ...formData,
          id: Date.now(),
        }));
      }

      alert(isEditMode ? "User updated ✅" : "User added ✅");
      navigate("/");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form">

        <h2 className="form-title">
          {isEditMode ? "Edit User" : "Add New User"}
        </h2>

        <div className="form-grid">
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
          <InputField label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <InputField label="Company" name="company" value={formData.company} onChange={handleChange} />

          <Dropdown label="Country" name="country" value={formData.country} options={countriesData.map(c => c.name)} onChange={handleChange} />

          <Dropdown
            label="State"
            name="state"
            value={formData.state}
            options={states.length > 0 ? states : ["No states available"]}
            onChange={handleChange}
            disabled={!formData.country || states.length === 0}
          />

          {errors.state && <div className="error-text">{errors.state}</div>}

          <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
          <InputField label="Dial Code" name="dialCode" value={formData.dialCode} readOnly />
          <InputField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} error={errors.mobile} />
          <InputField label="Team" name="team" value={formData.team} onChange={handleChange} />
          <InputField label="Department" name="department" value={formData.department} onChange={handleChange} />
        </div>

        {/*  BUTTONS */}
        

<div className={`form-actions ${!isEditMode ? "add-mode" : ""}`}>
  {isEditMode && (
    <button type="button" className="cancel-btn" onClick={handleBack}>
      Cancel
    </button>
  )}

  <button type="submit" className="submit-btn">
    {isEditMode ? "Save Changes" : "Submit"}
  </button>
</div>



      </form>

      {/*  MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>All your changes will be discarded. Continue?</p>

            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={cancelDiscard}>
                Stay
              </button>
              <button className="modal-btn confirm" onClick={confirmDiscard}>
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserForm;
