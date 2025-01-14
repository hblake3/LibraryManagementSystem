// This component handles all CRUD operations for book table

export class BookService {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  async getBooks() {
    const { data, error } = await this.supabase
    .from('book')
    .select('*, author!inner(name)') // Just select the name from author
    .order('title', { ascending: true });
    if (error) throw error;
    return data;
  }

  // async updateBook(bookid, updateData) {
  //   const { data, error } = await this.supabase
  //     .from('book')
  //     .update(updateData)
  //     .eq('bookid', bookid)
  //     .select();

  //   if (error) {
  //     console.error('Supabase error:', error);
  //     throw error;
  //   }

  //   console.log('Supabase response:', data);
  //   return data[0];
  // }
}
