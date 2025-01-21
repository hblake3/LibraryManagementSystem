// This component handles all CRUD operations for book table

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

  async updateBook(bookid, updateData) {
    console.log('updateData.author:', updateData.author); // data sent from the book modal form
    console.log('updateData.title:', updateData.title); // data sent from the book modal form

    // first try to get the existing author from the table
    const { data: authorData, error: authorError } = await this.supabase
      .from('author')
      .select('authorid')
      .eq('name', updateData.author)
      .maybeSingle();

    if (!authorData) {
      // author wasn't found, let's create it
      console.log("author wasn't found, let's create it");
      const { data: createAuthor, error: createError } = await this.supabase
        .from('author')
        .insert({ name: updateData.author })
        .select('authorid')
        .single();
      if (createError) throw createError;
    }

    const { data: bookSubmission, error: submitError } = await this.supabase
      .from('book')
      .update({
        title: updateData.title,
      })
      .eq('bookid', bookid)
      .select();

    if (submitError) {
      console.error('Supabase error:', submitError);
      throw submitError;
    }

    console.log(JSON.stringify(bookSubmission));

    return bookSubmission[0];
  }
}
