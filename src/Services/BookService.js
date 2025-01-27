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
    console.log(
      `updateData immediately after clicking save: ${JSON.stringify(
        updateData
      )}`
    );
    const { data, error } = await this.supabase.rpc('update_book', {
      p_bookid: bookid,
      p_update_data: updateData,
    });
    if (error) throw error;
    console.log(JSON.stringify(data));
  }

  //*********************************************************************************** */

  // //////////////////////////////////////////////////////////////////////////////////////
  // updates book record (and cooresponding tables) when changes are made in a book modal
  // This isn't supported... I need to use RPC to a supabase function...
  // async updateBook(bookid, updateData) {
  //   let authorID; // stores new or existing authorID for the update

  //   // create a supabase transaction for atomic updates on multiple tables
  //   const { data, error } = await this.supabase.transaction(async (tx) => {
  //     // first try to get an exisiting author from the author table
  // const { data: existingAuthor, error: existingAuthorError } = await tx
  //   .from('author')
  //   .select('authorid')
  //   .eq('name', updateData.author)
  //   .single();
  // if (existingAuthorError) console.log(existingAuthorError);

  //     console.log(
  //       `updateBook Status:\n\tbookid: ${bookid}\n\tupdateData: ${JSON.stringify(
  //         updateData
  //       )}`
  //     );

  //     // no authorData found, author doesn't exist in table, let's create it
  //     if (!existingAuthor) {
  //       const { data: newAuthorData, error: newAuthorError } = await tx
  //         .from('author')
  //         .insert({ name: updateData.author })
  //         .select('authorid')
  //         .single();
  //       if (newAuthorError) console.log(newAuthorError);
  //       authorID = newAuthorData.authorid; // assign newly made authorID
  //     }
  //     // author was found, assign exisitng authorID
  //     else {
  //       authorID = existingAuthor.authorid;
  //     }

  //     // update the book record
  //     const { data: bookSubmission, error: bookSubmissionError } = await tx
  //       .from('book')
  //       .update({
  //         title: updateData.title,
  //         authorid: authorID,
  //         status: updateData.status,
  //         isbn: updateData.isbn,
  //       })
  //       .eq('bookid', bookid)
  //       .select();
  //     if (bookSubmissionError) console.log(bookSubmissionError);

  //     console.log('updateData.genres:', updateData.genres);

  //     // now we need to modify genres
  //     // first delete all existing genre associations
  //     const { data: deleteGenres, error: deleteGenresError } = await tx
  //       .from('book_genre')
  //       .delete()
  //       .eq('bookid', bookid);
  //     if (deleteGenresError) console.log(deleteGenresError);

  //     return bookSubmission[0];

  //     /////////////////////////////////
  //     ////////////// END OF TRANSACTION
  //     /////////////////////////////////
  //   });
  // }
}
