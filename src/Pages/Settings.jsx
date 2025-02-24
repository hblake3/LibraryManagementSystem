import Header from '../Components/Header.jsx';
import AlertMessage from '../Components/AlertMessage.jsx';
import { SettingsService } from '../Services/SettingsService';
import { supabase } from '../Services/SupabaseClient';
import { useEffect, useState } from 'react';

function Settings() {
  const settingsService = new SettingsService(supabase);
  const [lateFee, setLateFee] = useState('');
  const [canSave, setCanSave] = useState(true);
  const [maxLoans, setMaxLoans] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false); // for alert messages

  // Handle late fee state change and validate input
  const handleLateFeeChange = async (e) => {
    let amount = e.target.value;

    // regex pattern to enforce currency formatting
    const currencyPattern =
      /^(?!0\d)\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;

    if (currencyPattern.test(amount)) {
      e.target.classList.remove('incorrect');
      setCanSave(true);
    } else {
      e.target.classList.add('incorrect');
      setCanSave(false);
    }
    setLateFee(amount);
  };

  const handleMaxLoansChange = async (e) => {
    setMaxLoans(e.target.value);
  };

  const handleSaveChanges = async () => {
    const updateData = {
      _lateFee: { lateFee },
      _maxLoans: { maxLoans },
    };

    try {
      const response = await settingsService.saveChanges(updateData);
      if (response) {
        console.log('Settings update successful!');
        setSaveSuccess(true);
        setCanSave(false);
        // Reset saveSuccess after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false), setCanSave(true);
        }, 3000);
      } else {
        console.log('Settings update FAILED!', response);
      }
    } catch (e) {
      console.error('Exception updating settings:', e);
    }
  };

  // Load late fee on mount
  useEffect(() => {
    const loadLateFee = async () => {
      try {
        const _lateFee = await settingsService.getLateFee();
        setLateFee(_lateFee[0].value);
      } catch (error) {
        console.log(`Error setting lateFee: ${error}`);
      }
    };
    loadLateFee();
  }, []);

  // Load maximum loans on mount
  useEffect(() => {
    const loadMaxLoans = async () => {
      try {
        const _maxLoans = await settingsService.getMaxLoans();
        setMaxLoans(_maxLoans[0].value);
      } catch (error) {
        console.log(`Error setting maxLoans: ${error}`);
      }
    };
    loadMaxLoans();
  }, []);

  return (
    <>
      <Header />
      {saveSuccess && (
        <AlertMessage message="Settings updated successfully!" type="success" />
      )}
      <h1>Administrator Settings</h1>
      <div className="data-container">
        <ul>
          <li>
            <a href="#">Change Password</a>
          </li>
          <li>
            <a href="#">Update Personal Info</a>
          </li>
        </ul>
      </div>
      <h1>Library Settings</h1>
      <div className="data-container">
        <ul>
          <li>
            <b>Late Fees:</b> $
            <input
              className="input-standalone"
              type="text"
              defaultValue={lateFee}
              onChange={handleLateFeeChange}
            />
            per day.
          </li>
          <li>
            <b>Maximum Loans:</b>
            <select
              className="select-standalone"
              value={maxLoans}
              onChange={handleMaxLoansChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </li>
        </ul>
        <button
          type="button"
          className="save-button-standalone"
          disabled={!canSave}
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

export default Settings;
