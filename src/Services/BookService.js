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

  async updateBook(bookid, updateData) {
    let authorID; // stores new or exisitng authorID for update

    // console.log('updateData.author:', updateData.author); // data sent from the book modal form
    // console.log('updateData.title:', updateData.title); // data sent from the book modal form

    // first try to get the existing author from the table
    const { data: authorData, error: authorError } = await this.supabase
      .from('author')
      .select('authorid')
      .eq('name', updateData.author)
      .maybeSingle();

    if (!authorData) {
      // author wasn't found, let's create it
      // console.log("author wasn't found, let's create it");
      const { data: newAuthorData, error: newAuthorError } = await this.supabase
        .from('author')
        .insert({ name: updateData.author })
        .select('authorid')
        .single();
      if (newAuthorError) throw newAuthorError;
      authorID = newAuthorData.authorid; // assign newly made authorID
    } else {
      // author was found, assign exisitng authorID
      authorID = authorData.authorid;
    }

    // console.log(`authorID: ${authorID}`);

    // get the existing (or new) author id from the provided name

    const { data: bookSubmission, error: submitError } = await this.supabase
      .from('book')
      .update({
        title: updateData.title,
        authorid: authorID,
        status: updateData.status,
        isbn: updateData.isbn,
      })
      .eq('bookid', bookid)
      .select();

    // TRYING TO UPDATE BOOK_GENRE FOR BOOK UPDATE
    // UNCOMMENT THE BELOW
    // .from('book_genre')
    // .update({
    //   updateData.genres
    // });

    if (submitError) {
      console.error('Supabase error:', submitError);
      throw submitError;
    }

    // console.log(JSON.stringify(bookSubmission));

    return bookSubmission[0];
  }
}
