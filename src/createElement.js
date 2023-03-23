export const createImage = (element, button, photo) => {
  button.classList.remove('hidden');
  const addSpaces = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('w-80', 'bg-white', 'p-3', 'w-full');
  galleryItem.innerHTML = `
    <a href="${photo.largeImageURL}">
       <img class="h-52 w-full object-cover" src="${photo.webformatURL}" alt="${photo.tags}" />
    </a>
    <ul class="mt-3 flex flex-wrap">
      <li class="mr-auto mb-2">
        <a href="#" class="flex text-gray-400 hover:text-gray-600">
          <svg class="mr-0.5" style="width: 24px; height: 24px" viewBox="0 0 24 24">
     <path d="M20 15V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 15M8 11L12 15M12 15L16 11M12 15V3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${addSpaces(photo.downloads)}
        </a>
      </li>
      <li class="mr-2 mb-2">
        <a href="#" class="flex text-gray-400 hover:text-gray-600">
          <svg class="mr-0.5" style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
            />
          </svg>
          ${addSpaces(photo.views)}
        </a>
      </li>
      <li class="mr-2 mb-2">
        <a href="#" class="flex text-gray-400 hover:text-gray-600">
          <svg class="mr-0.5" style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"
            />
          </svg>
          ${photo.comments}
        </a>
      </li>
      <li class="mb-2">
        <a href="#" class="flex text-gray-400 hover:text-gray-600">
          <svg class="mr-0.5" style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
            />
          </svg>
          ${photo.likes}
        </a>
      </li>
    </ul>
`;
  element.append(galleryItem);
};
