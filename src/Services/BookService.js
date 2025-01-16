// This component handles all CRUD operations for book table

export class BookService {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  async getBooks() {
    const { data, error } = await this.supabase
      .from('book')
      .select(
        `
          *,
          author(name),
          book_genre(genre(type))
        `
      )
      .order('title', { ascending: true });
    if (error) throw error;
    return data;
  }

  // will need to modify this to update the table after a change is made

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
