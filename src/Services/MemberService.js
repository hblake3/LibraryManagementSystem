// This component handles all CRUD operations for members

export class MemberService {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  async getMembers() {
    const { data, error } = await this.supabase
      .from('member')
      .select('*')
      .order('nameLast', { ascending: true });
    if (error) throw error;
    return data;
  }

  async updateMember(memberid, updateData) {
    console.log('Service receiving:', { memberid, updateData });

    const { data, error } = await this.supabase
      .from('member')
      .update(updateData)
      .eq('memberid', memberid)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Supabase response:', data);
    return data[0];
  }
}
