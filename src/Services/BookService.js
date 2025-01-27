// This component handles all CRUD operations for book related tasks

export class BookService {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  async getAllAuthors() {
    const { data: allAuthors, error } = await this.supabase
      .from('author')
      .select('name')
      .order('name', { ascending: true });
    if (error) throw error;
    return allAuthors;
  }

  async getBookTitles() {
    const { data: allTitles, error } = await this.supabase
      .from('book')
      .select('title')
      .order('title', { ascending: true });
    if (error) throw error;
    return allTitles;
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

  //*********************************************************************************** */
  // Since update book requires chaining multiple SQL statements, we need to invoke a remote procedure call to a supabase function to ensure atomicity (all or nothing)

  async updateBook(bookid, updateData) {
    // Log the incoming data
    console.log('Incoming updateData:', updateData);

    // Create a new object with the correct field name
    const cleanedData = {
      ...updateData,
      genre: updateData.genres, // Rename genres to genre
      status: parseInt(updateData.status),
    };
    delete cleanedData.genres; // Remove the old genres field
    delete cleanedData.bookid; // Remove bookid as it's sent separately

    console.log('Cleaned data for RPC:', cleanedData);

    const { data, error } = await this.supabase.rpc('update_book', {
      p_bookid: bookid,
      p_update_data: cleanedData,
    });

    console.log('RPC Response:', JSON.stringify(data));

    if (error) throw error;
    return data;
  }
}
