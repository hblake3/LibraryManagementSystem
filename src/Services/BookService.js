// This component handles all CRUD operations for book related tasks

export class BookService {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  // get next bookid using rpc
  async getNextBookID() {
    const { data: nextBookID, error: nextBookIDError } =
      await this.supabase.rpc(`get_next_bookid`);
    if (nextBookIDError)
      console.log(`Error getting next book ID: ${nextBookIDError}`);
    return nextBookID;
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
    console.log('Book Service Receiving:', { bookid, updateData });
    // modify the data to fit the rpc
    const cleanedData = {
      ...updateData,
      genre: updateData.genres, // rename genres to genre
      status: parseInt(updateData.status),
    };
    delete cleanedData.genres; // remove the old 'genres' field (i should really make these the same name...)
    delete cleanedData.bookid; // book id doesn't need to be sent twice

    // console.log('Cleaned data for RPC:', cleanedData); // view data that is sent via rpc

    const { data, error } = await this.supabase.rpc('update_book', {
      p_bookid: bookid,
      p_update_data: cleanedData,
    });

    // console.log('RPC Response:', JSON.stringify(data)); // view response from rpc

    if (error) throw error;
    return data;
  }
}
