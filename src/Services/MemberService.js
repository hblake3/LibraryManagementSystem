// This component handles all CRUD operations for members

export class MemberService {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  // get next memberID using rpc
  async getNextMemberID() {
    const { data: nextMemberID, error: nextMemberIDError } =
      await this.supabase.rpc(`get_next_memberid`);
    if (nextMemberIDError) console.log(`Error getting next member ID: ${nextMemberIDError}`);
    return nextMemberID;
  }

  async getMembers() {
    const { data, error } = await this.supabase
      .from('member')
      .select('*')
      .order('nameLast', { ascending: true });
    if (error) throw error;
    return data;
  }

  // insert or update a member
  async updateMember(memberid, updateData) {
    console.log('Service receiving:', { memberid, updateData });

    const { data, error } = await this.supabase
      .from('member')
      .upsert({
        memberid,
        ...updateData,
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Supabase response:', data);
    return data[0];
  }
}
