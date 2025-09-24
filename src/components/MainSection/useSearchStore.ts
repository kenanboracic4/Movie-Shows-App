import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SearchState {
 
  searchTerm: string
  activeTab: string
  movieList: any[]
  tvShowList: any[]
  isLoading: boolean
  errorMessage: string
  

  setSearchTerm: (term: string) => void
  setActiveTab: (tab: string) => void
  setMovieList: (movies: any[]) => void
  setTvShowList: (shows: any[]) => void
  setIsLoading: (loading: boolean) => void
  setErrorMessage: (message: string) => void
  clearSearch: () => void
}

const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
     
      searchTerm: '',
      activeTab: 'movies',
      movieList: [],
      tvShowList: [],
      isLoading: false,
      errorMessage: '',
      
      
      setSearchTerm: (term: string) => set({ searchTerm: term }),
      
      setActiveTab: (tab: string) => set({ 
        activeTab: tab,
       
        errorMessage: ''
      }),
      
      setMovieList: (movies: any[]) => set({ 
        movieList: movies,
        isLoading: false 
      }),
      
      setTvShowList: (shows: any[]) => set({ 
        tvShowList: shows,
        isLoading: false 
      }),
      
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
      
      setErrorMessage: (message: string) => set({ 
        errorMessage: message,
        isLoading: false 
      }),
      
      clearSearch: () => set({ 
        searchTerm: '',
        movieList: [],
        tvShowList: [],
        errorMessage: ''
      })
    }),
    {
      name: 'movie-search-storage',
      partialize: (state) => ({
        searchTerm: state.searchTerm,
        activeTab: state.activeTab,
        movieList: state.movieList,
        tvShowList: state.tvShowList
      })
    }
  )
)

export default useSearchStore