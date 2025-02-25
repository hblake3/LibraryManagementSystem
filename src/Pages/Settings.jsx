import Header from '../Components/Header.jsx';
import AlertMessage from '../Components/AlertMessage.jsx';
import { SettingsService } from '../Services/SettingsService';
import { supabase } from '../Services/SupabaseClient';
import { useEffect, useState } from 'react';

function Settings() {
  const settingsService = new SettingsService(supabase);
  const [lateFee, setLateFee] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [canSaveLateFee, setCanSaveLateFee] = useState(true);
  const [canSaveDuration, setCanSaveDuration] = useState(true);
  const [maxLoans, setMaxLoans] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false); // for alert messages

  // Handle loan duration state change and validate input
  const handleLoanDurationChange = async (e) => {
    let duration = e.target.value;
    const intPattern = /^\d+$/; // regex pattern to enforce integer input

    if (duration === '' || !intPattern.test(duration)) {
      e.target.classList.add('incorrect');
      setCanSaveDuration(false);
    } else {
      e.target.classList.remove('incorrect');
      setCanSaveDuration(true);
    }
    setLoanDuration(duration);
  };

  // Handle late fee state change and validate input
  const handleLateFeeChange = async (e) => {
    let amount = e.target.value;

    const currencyPattern =
      /^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/; // regex pattern to enforce currency formatting

    if (amount === '' || !currencyPattern.test(amount)) {
      e.target.classList.add('incorrect');
      setCanSaveLateFee(false);
    } else {
      e.target.classList.remove('incorrect');
      setCanSaveLateFee(true);
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
      _loanDuration: { loanDuration },
    };

    try {
      const response = await settingsService.saveChanges(updateData);
      if (response) {
        console.log('Settings update successful!');
        setSaveSuccess(true);
        setCanSaveDuration(false);
        setCanSaveLateFee(false);

        // Allow save changes again after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false),
            setCanSaveLateFee(true),
            setCanSaveDuration(true);
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
        const fee = _lateFee[0].value;
        setLateFee(fee);

        // Validate initial value
        const currencyPattern =
          /^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/;
        if (fee === '' || !currencyPattern.test(fee)) {
          setCanSaveLateFee(false);
        }
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

  // Load loan duration on mount
  useEffect(() => {
    const loadLoanDuration = async () => {
      try {
        const _loanDuration = await settingsService.getLoanDuration();
        const duration = _loanDuration[0].value;
        setLoanDuration(duration);

        // Validate initial value
        const intPattern = /^\d+$/;
        if (duration === '' || !intPattern.test(duration)) {
          setCanSaveDuration(false);
        }
      } catch (error) {
        console.log(`Error setting loanDuration: ${error}`);
      }
    };
    loadLoanDuration();
  }, []);

  return (
    <>
      <Header />
      {saveSuccess && (
        <AlertMessage message="Settings updated successfully!" type="success" />
      )}
      <div className="settings-container">
        <h1 className="left-aligned-h1">Account Settings</h1>
        <div className="centered-data-container">
          <ul>
            <li>
              <a href="#">Change Password</a>
            </li>
            <li>
              <a href="#">Update Personal Info</a>
            </li>
          </ul>
        </div>
        <h1 className="left-aligned-h1">Library Settings</h1>
        <div className="centered-data-container">
          <ul>
            <li>
              <b>Late Fees:</b> $
              <input
                className="input-standalone"
                type="text"
                value={lateFee}
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
            <li>
              <b>Loan Duration:</b>
              <input
                className="input-standalone"
                type="text"
                value={loanDuration}
                onChange={handleLoanDurationChange}
              />
              days.
            </li>
          </ul>
          <button
            type="button"
            className="save-button-standalone"
            disabled={!canSaveDuration || !canSaveLateFee}
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;
