update public.books
set cover_url = 'https://covers.openlibrary.org/b/isbn/9781784351151-L.jpg?default=false'
where title = 'Lalka' and author = 'Bolesław Prus';

update public.books
set cover_url = 'https://covers.openlibrary.org/b/isbn/0547978847-L.jpg?default=false'
where title = 'Mały Książę' and author = 'Antoine de Saint-Exupéry';

update public.books
set cover_url = 'https://covers.openlibrary.org/b/isbn/8493480304-L.jpg?default=false'
where title = 'Solaris' and author = 'Stanisław Lem';
