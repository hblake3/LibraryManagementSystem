// This component handles all CRUD operations for book table

export class BookService {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
  }

  async getAllAuthors() {
    const { data: allAuthors, error } = await this.supabase
      .from('author')
      .select('name');
    if (error) throw error;
    return allAuthors;
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

  async updateBook(bookid, updateData) {
    console.log('updateData.author:', updateData.author); // data sent from the book modal form

    // first try to get the existing author from the table
    const { data: authorData, error } = await this.supabase
      .from('author')
      .select('authorid')
      .eq('name', updateData.author)
      .maybeSingle();

    if (!authorData) {
      // author wasn't found, let's create it
      console.log("author wasn't found, let's create it");
      const { data: newAuthor, error } = await this.supabase
        .from('author')
        .insert({ name: updateData.author })
        .select('authorid')
        .single();
      if (error) throw error;
    } else {
      // author was found, leave it alone?
      console.log('fetched author id = ' + authorData.authorid);
    }

    return 'end of updateBook';
  }
}
