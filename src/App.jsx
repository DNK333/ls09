import { useState } from 'react'
import './App.css'

const genres = ['Все', 'Фантастика', 'Комедия', 'Боевик', 'Драма']

const initialMovies = [
  { id: 1, title: 'Интерстеллар', genre: 'Фантастика' },
  { id: 2, title: 'Крепкий орешек', genre: 'Боевик' },
  { id: 3, title: 'Три орешка для Золушки', genre: 'Комедия' },
  { id: 4, title: 'Пианист', genre: 'Драма' },
  { id: 5, title: 'Звёздный путь', genre: 'Фантастика' },
]

function App() {
  const [movies, setMovies] = useState(initialMovies)
  const [movieTitle, setMovieTitle] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Фантастика')
  const [activeFilter, setActiveFilter] = useState('Все')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editGenre, setEditGenre] = useState('Фантастика')

  const filteredMovies =
    activeFilter === 'Все'
      ? movies
      : movies.filter((movie) => movie.genre === activeFilter)

  const handleAddMovie = () => {
    const title = movieTitle.trim()

    if (!title) {
      return
    }

    setMovies((prevMovies) => [
      ...prevMovies,
      { id: Date.now(), title, genre: selectedGenre },
    ])
    setMovieTitle('')
    setSelectedGenre('Фантастика')
  }

  const handleDeleteMovie = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id))

    if (editingId === id) {
      setEditingId(null)
      setEditTitle('')
      setEditGenre('Фантастика')
    }
  }

  const startEdit = (movie) => {
    setEditingId(movie.id)
    setEditTitle(movie.title)
    setEditGenre(movie.genre)
  }

  const saveEdit = (id) => {
    const trimmedTitle = editTitle.trim()

    if (!trimmedTitle) {
      return
    }

    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, title: trimmedTitle, genre: editGenre } : movie,
      ),
    )
    setEditingId(null)
    setEditTitle('')
    setEditGenre('Фантастика')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditGenre('Фантастика')
  }

  return (
    <div className="app">
      <h1>Фильмы</h1>

      <div className="panel">
        <div className="form-row">
          <label className="field">
            <span>Название фильма</span>
            <input
              type="text"
              value={movieTitle}
              onChange={(event) => setMovieTitle(event.target.value)}
              placeholder="Введите название фильма"
            />
          </label>

          <label className="field">
            <span>Жанр</span>
            <select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
            >
              {genres
                .filter((genre) => genre !== 'Все')
                .map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
            </select>
          </label>

          <button type="button" className="add-button" onClick={handleAddMovie}>
            Добавить
          </button>
        </div>
      </div>

      <div className="filters" aria-label="Фильтр по жанру">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={activeFilter === genre ? 'filter-button active' : 'filter-button'}
            onClick={() => setActiveFilter(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <p className="count">Найдено фильмов: {filteredMovies.length}</p>

      {filteredMovies.length === 0 ? (
        <p className="empty-message">Список фильмов пуст</p>
      ) : (
        <ul className="movie-list">
          {filteredMovies.map((movie) => (
            <li key={movie.id} className="movie-item">
              {editingId === movie.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                  />

                  <select
                    value={editGenre}
                    onChange={(event) => setEditGenre(event.target.value)}
                  >
                    {genres
                      .filter((genre) => genre !== 'Все')
                      .map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                  </select>

                  <div className="actions">
                    <button type="button" className="save-button" onClick={() => saveEdit(movie.id)}>
                      Сохранить
                    </button>
                    <button type="button" className="secondary-button" onClick={cancelEdit}>
                      Отмена
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="movie-info">
                    <span className="movie-title">{movie.title}</span>
                    <span className="movie-genre">{movie.genre}</span>
                  </div>

                  <div className="actions">
                    <button type="button" className="secondary-button" onClick={() => startEdit(movie)}>
                      Редактировать
                    </button>
                    <button type="button" className="delete-button" onClick={() => handleDeleteMovie(movie.id)}>
                      Удалить
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
