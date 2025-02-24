// This component handles CRUD operations for settings

export class SettingsService {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  // Get and return the current late fee from the settings table.
  async getLateFee() {
    const { data, error } = await this.supabase
      .from('settings')
      .select('value')
      .eq('name', 'lateFee');
    if (error) console.log(JSON.stringify(error));
    return data;
  }

  // Get and return the current max loans from the settings table.
  async getMaxLoans() {
    const { data, error } = await this.supabase
      .from('settings')
      .select('value')
      .eq('name', 'maxLoans');
    if (error) console.log(JSON.stringify(error));
    return data;
  }

  // Save changes from the library settings page to the settings table
  async saveChanges(_updateData) {
    let newLateFee = parseFloat(_updateData._lateFee.lateFee).toFixed(2);
    let newMaxLoans = _updateData._maxLoans.maxLoans;
    let success = true;

    const { feeError } = await this.supabase
      .from('settings')
      .update({ value: newLateFee })
      .eq('name', 'lateFee');

    if (feeError) {
      success = false;
      console.log('Settings update error: ', feeError);
      throw feeError;
    }

    const { loansError } = await this.supabase
      .from('settings')
      .update({ value: newMaxLoans })
      .eq('name', 'maxLoans');

    if (loansError) {
      success = false;
      console.log('Settings update error: ', loansError);
      throw loansError;
    }
    return success;
  }
}
