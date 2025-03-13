import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import Navigation from './components/Navigation';
import TopBar from './components/TopBar';
import './App.css';
import './index.css';
import card_image_1 from './assets/card_1.png';
import card_image_2 from './assets/card_2.png';
import card_image_3 from './assets/card_3.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [selectedSort, setSelectedSort] = useState('Top match'); // State for selected sort option
  const [isAlertOn, setIsAlertOn] = useState(false); // State for alert
  const toggleAlert = () => {
    setIsAlertOn(!isAlertOn);
  };
  const handleSortClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);
  };
  const jobs = [
    {
      title: "Gaming UI designer",
      image: card_image_1,
      status:true,
      company: "Rockstar Games",
      location: "ElMansoura, Egypt",
      time: "10 days ago",
      experience: "0-3y of exp",
      type: "Full time",
      remote: "Remote",
      categories: ["Creative/Design", "IT/Software development", "Gaming"]
    },
    {
      title: "Senior UX UI Designer",
      image: card_image_2,
      status: false,
      company: "Egabi",
      location: "Cairo, Egypt",
      time: "month ago",
      experience: "0-3y of exp",
      type: "Full time",
      remote: "Hybrid",
      categories: ["Creative/Design", "IT/Software development"]
    },
    {
      title: "React Frontend developer",
      image: card_image_3,
      status: false,
      company: "Magara",
      location: "Cairo, Egypt",
      time: "month ago",
      experience: "5 - 7y of exp",
      type: "Freelance",
      remote: "Remote",
      categories: ["Creative/Design", "IT/Software development"]
    },
    {
      title: "Gaming UI designer",
      image: card_image_1,
      status: false,
      company: "Rockstar Games",
      location: "ElMansoura, Egypt",
      time: "10 days ago",
      experience: "0-3y of exp",
      type: "Full time",
      remote: "Remote",
      categories: ["Creative/Design", "IT/Software development", "Gaming"]
    },
    {
      title: "Senior UX UI Designer",
      image: card_image_2,
      status: false,
      company: "Egabi",
      location: "Cairo, Egypt",
      time: "month ago",
      experience: "0-3y of exp",
      type: "Full time",
      remote: "Hybrid",
      categories: ["Creative/Design", "IT/Software development"]
    },
    {
      title: "React Frontend developer",
      image: card_image_3,
      status: false,
      company: "Magara",
      location: "Cairo, Egypt",
      time: "month ago",
      experience: "5 - 7y of exp",
      type: "Freelance",
      remote: "Remote",
      categories: ["Creative/Design", "IT/Software development"]
    },
  ];

  return (
    <NavigationProvider>
      <Router>
        <div className="min-h-screen bg-[#F8F8F8] relative">
          <TopBar />
          <div className="flex">
            {/* Side Navigation */}
            <aside className={`fixed left-0 top-[5.3rem] h-[calc(100vh-4rem)] w-72 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out 
              ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
              <Navigation toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-72 p-4 lg:p-6 mt-20">
              <div className="lg:flex justify-end mb-6 hidden">
                <div className="relative">
                  <button
                    className="px-3 py-1 text-sm text-gray-600 bg-white flex items-center"
                    onClick={handleSortClick}
                  >
                    Sorting by: <span className="text-green-600 ml-1">{selectedSort}</span>
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 w-44 bg-white rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <button
                          className={`w-full text-left px-4 py-2 text-sm ${selectedSort === 'Top match' ? 'text-green-600' : 'text-gray-700'} hover:bg-gray-100`}
                          onClick={() => handleSortSelect('Top match')}
                        >
                          Top match
                        </button>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm ${selectedSort === 'Newest' ? 'text-green-600' : 'text-gray-700'} hover:bg-gray-100`}
                          onClick={() => handleSortSelect('Newest')}
                        >
                          Newest
                        </button>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm ${selectedSort === 'Latest' ? 'text-green-600' : 'text-gray-700'} hover:bg-gray-100`}
                          onClick={() => handleSortSelect('Latest')}
                        >
                          Latest
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex lg:justify-between gap-2 lg:block'>
                <div className="flex flex-1 md:flex-row flex-col lg:items-center lg:gap-5 gap-0  lg:justify-between bg-[#3D8E41] text-white rounded-md md:p-6 p-2">
                  <div className="flex flex-col mb-2 lg:mb-0 flex-1">
                    <h2 className="text-sm md:text-lg font-semibold">UI Designer in Egypt</h2>
                    <span className="text-sm">70 job positions</span>
                  </div>
                  <div className="flex items-center gap-2 flex-row-reverse lg:flex-row">
                    <span className="text-sm">Set alert</span>
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isAlertOn ? 'bg-white' : 'bg-gray-300'}`}
                      onClick={toggleAlert}
                    >
                      <div
                        className={`${isAlertOn ? 'bg-green-600' : 'bg-white'} w-4 h-4 rounded-full shadow-md transform transition-transform ${isAlertOn ? 'translate-x-6' : 'translate-x-0'}`}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden w-[70px] md:w-28 p-2 text-white bg-[#fff] rounded border-[#F0F0F0] border-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg className="w-6 h-6 mx-auto text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-6">
                {jobs.map((job, index) => (
                  <div key={index} className={`rounded-lg p-4 transition-shadow border ${index === 0 ? 'bg-[#F5FFF5] border-[#C8E6C9]' : 'bg-white border-gray-100'} hover:shadow-lg`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${job.status ? 'bg-[#E3F2FD]' : 'bg-white'} rounded-lg flex items-center justify-center`}>
                          <img src={job.image} alt={job.company} className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${index === 0 ? 'text-gray-900' : 'text-gray-900'}`}>{job.title}</h3>
                          <p className={`text-sm ${index === 0 ? 'text-[#4CAF50]' : 'text-[#4CAF50]'}`}>{job.company}</p>
                        </div>
                      </div>
                      <button className={`text-gray-400 bg-white rounded-full p-[15px] border-2 ${index === 0 ? 'hover:text-[#4CAF50]' : 'hover:text-[#4CAF50]'}`}>
                        {/* Heart icon */}
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1_475)">
                            <path d="M16.9902 1.98249C16.4308 1.98249 15.8923 2.08745 15.3748 2.29735C14.8574 2.50726 14.3784 2.78713 13.9378 3.13697C13.4973 3.48681 13.1022 3.88563 12.7525 4.33343C12.4029 4.79522 12.1162 5.26401 11.8924 5.73979C11.6687 5.26401 11.382 4.79522 11.0323 4.33343C10.6827 3.88563 10.2876 3.48681 9.84703 3.13697C9.40648 2.78713 8.92748 2.50726 8.41001 2.29735C7.89254 2.08745 7.35409 1.98249 6.79467 1.98249C6.01148 1.98249 5.27723 2.12943 4.59194 2.42329C3.90664 2.71716 3.30876 3.11948 2.79828 3.63025C2.28781 4.14102 1.88572 4.73924 1.59202 5.42493C1.29832 6.11062 1.15147 6.84529 1.15147 7.62893C1.15147 9.21022 1.50811 10.5466 2.22137 11.6381C2.93464 12.7436 3.82622 13.7931 4.89612 14.7867C5.96602 15.7802 7.12333 16.8228 8.36805 17.9143C9.62676 18.9918 10.8015 20.3142 11.8924 21.8815C12.9274 20.3282 14.0672 18.9988 15.3119 17.8933C16.5566 16.7878 17.7209 15.7313 18.8048 14.7237C19.8887 13.7162 20.8013 12.6666 21.5425 11.5751C22.2698 10.4696 22.6334 9.15424 22.6334 7.62893C22.6334 6.84529 22.4865 6.11062 22.1928 5.42493C21.8991 4.73924 21.497 4.14102 20.9866 3.63025C20.4761 3.11948 19.8782 2.71716 19.1929 2.42329C18.5076 2.12943 17.7734 1.98249 16.9902 1.98249Z" fill="#C4C3C3" />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_475">
                              <rect width="22" height="21.4943" fill="white" transform="matrix(1 0 0 -1 0.892273 22.1333)" />
                            </clipPath>
                          </defs>
                        </svg>

                      </button>
                    </div>

                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center justify-between gap-2">
                        <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.97469 7.08329C4.72614 7.08329 5.44681 6.78478 5.97816 6.25343C6.50951 5.72208 6.80802 5.00141 6.80802 4.24996C6.80802 3.49851 6.50951 2.77784 5.97816 2.24649C5.44681 1.71514 4.72614 1.41663 3.97469 1.41663C3.22324 1.41663 2.50257 1.71514 1.97122 2.24649C1.43987 2.77784 1.14136 3.49851 1.14136 4.24996C1.14136 5.00141 1.43987 5.72208 1.97122 6.25343C2.50257 6.78478 3.22324 7.08329 3.97469 7.08329ZM3.97469 7.08329V15.5833" stroke="#707070" strokeWidth="2" />
                        </svg>
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1_499)">
                            <path d="M5.23059 2.38086V3.11914H3.71887C3.41418 3.11914 3.12415 3.17773 2.84875 3.29492C2.57336 3.41211 2.33606 3.57617 2.13684 3.78711C1.93762 3.98633 1.77649 4.22363 1.65344 4.49902C1.5304 4.77441 1.46887 5.06445 1.46887 5.36914V15.8809C1.46887 16.1855 1.52747 16.4756 1.64465 16.751C1.76184 17.0264 1.9259 17.2637 2.13684 17.4629C2.33606 17.6621 2.57336 17.8232 2.84875 17.9463C3.12415 18.0693 3.41418 18.1309 3.71887 18.1309H14.2306C14.5353 18.1309 14.8253 18.0723 15.1007 17.9551C15.3761 17.8379 15.6134 17.6738 15.8126 17.4629C16.0118 17.2637 16.173 17.0264 16.296 16.751C16.4191 16.4756 16.4806 16.1855 16.4806 15.8809V5.36914C16.4806 5.06445 16.422 4.77441 16.3048 4.49902C16.1876 4.22363 16.0236 3.98633 15.8126 3.78711C15.6134 3.58789 15.3761 3.42676 15.1007 3.30371C14.8253 3.18066 14.5353 3.11914 14.2306 3.11914H12.7189V2.38086C12.7189 2.16992 12.6456 1.99121 12.4991 1.84473C12.3527 1.69824 12.1798 1.625 11.9806 1.625C11.7697 1.625 11.5909 1.69824 11.4445 1.84473C11.298 1.99121 11.2247 2.16992 11.2247 2.38086V3.11914H6.72473V2.38086C6.72473 2.16992 6.65149 1.99121 6.505 1.84473C6.35852 1.69824 6.17981 1.625 5.96887 1.625C5.76965 1.625 5.5968 1.69824 5.45032 1.84473C5.30383 1.99121 5.23059 2.16992 5.23059 2.38086ZM14.9689 7.61914H2.98059V5.36914C2.98059 5.27539 2.99817 5.18164 3.03333 5.08789C3.06848 4.99414 3.12122 4.91211 3.19153 4.8418C3.26184 4.77148 3.34094 4.71875 3.42883 4.68359C3.51672 4.64844 3.6134 4.63086 3.71887 4.63086H5.23059V5.36914C5.23059 5.58008 5.30383 5.75879 5.45032 5.90527C5.5968 6.05176 5.76965 6.125 5.96887 6.125C6.17981 6.125 6.35852 6.05176 6.505 5.90527C6.65149 5.75879 6.72473 5.58008 6.72473 5.36914V4.63086H11.2247V5.36914C11.2247 5.58008 11.298 5.75879 11.4445 5.90527C11.5909 6.05176 11.7697 6.125 11.9806 6.125C12.1798 6.125 12.3527 6.05176 12.4991 5.90527C12.6456 5.75879 12.7189 5.58008 12.7189 5.36914V4.63086H14.2306C14.3243 4.63086 14.4181 4.64844 14.5118 4.68359C14.6056 4.71875 14.6876 4.77148 14.7579 4.8418C14.8282 4.91211 14.881 4.99414 14.9161 5.08789C14.9513 5.18164 14.9689 5.27539 14.9689 5.36914V7.61914ZM2.98059 9.13086H14.9689V15.8809C14.9689 15.9746 14.9513 16.0684 14.9161 16.1621C14.881 16.2559 14.8282 16.3379 14.7579 16.4082C14.6876 16.4785 14.6085 16.5312 14.5206 16.5664C14.4327 16.6016 14.3361 16.6191 14.2306 16.6191H3.71887C3.62512 16.6191 3.53137 16.6016 3.43762 16.5664C3.34387 16.5312 3.26184 16.4785 3.19153 16.4082C3.12122 16.3379 3.06848 16.2559 3.03333 16.1621C2.99817 16.0684 2.98059 15.9746 2.98059 15.8809V9.13086Z" fill="#707070" />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_499">
                              <rect width="18" height="18" fill="white" transform="matrix(1 0 0 -1 0 18.5)" />
                            </clipPath>
                          </defs>
                        </svg>
                        {job.time}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className={`px-3 py-1 text-sm ${job.status ? 'bg-white' : 'bg-gray-100'} text-gray-600 rounded-md`}>
                        {job.experience}
                      </span>
                      <span className={`px-3 py-1 text-sm ${job.status ? 'bg-white' : 'bg-gray-100'} text-gray-600 rounded-md`}>
                        {job.type}
                      </span>
                      <span className={`px-3 py-1 text-sm ${job.status ? 'bg-white' : 'bg-gray-100'} text-gray-600 rounded-md`}>
                        {job.remote}
                      </span>
                    </div>
                    <hr className="my-4 border-gray-200" />
                    {job.categories.map((category, i) => (
                      <span className="mt-4 text-sm text-gray-500" key={i}>
                        {category}{i < job.categories.length - 1 ? '  -  ' : ''}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav className="flex items-center space-x-1">
                  <button className="px-3 py-2 text-sm text-gray-600 border border-[#C4C3C3] rounded hover:bg-gray-100">
                    <svg width="8" height="20" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.42188 10.5859L6.01562 11.9922L0.015625 5.99219L6.01562 -0.0078125L7.42188 1.39844L2.82812 5.99219L7.42188 10.5859Z" fill="#707070" />
                    </svg>

                  </button>
                  <button className="px-3 py-2 text-sm text-white bg-green-600 border border-green-600 rounded">
                    1
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-600 border border-[#C4C3C3] rounded hover:bg-gray-100">
                    2
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-600 border border-[#C4C3C3] rounded hover:bg-gray-100">
                    3
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-600 border border-[#C4C3C3] rounded hover:bg-gray-100">
                    <svg width="8" height="20" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.578125 10.5859L5.17188 5.99219L0.578125 1.39844L1.98438 -0.0078125L7.98438 5.99219L1.98438 11.9922L0.578125 10.5859Z" fill="#707070" />
                    </svg>

                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </NavigationProvider>
  );
}

export default App;