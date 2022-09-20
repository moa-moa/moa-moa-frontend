interface Props {
  message?: string;
}

export default function CreateClubLoading({ message }: Props) {
  return (
    <section className='fixed top-0 left-0 w-full h-full bg-loading-bg z-[11] flex flex-col justify-center items-center touch-none'>
      <section className='loading flex'>
        <div className='moa z-[2]'>
          <svg
            width='109'
            height='36'
            viewBox='0 0 109 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M88.5269 36C93.4423 36 97.3192 33.6462 99.1192 29.4231V35.1H108.673V18.3462C108.673 7.13077 101.196 0 90.4654 0C79.5962 0 71.9808 7.40769 71.9808 18.4154C71.9808 30.3231 80.9115 36 88.5269 36Z'
              fill='#B8FFEA'
            />
            <path
              d='M62.4714 36C73.2714 36 80.8868 28.3846 80.8868 18C80.8868 7.61539 73.2714 0 62.4714 0C51.6714 0 44.056 7.61539 44.056 18C44.056 28.3846 51.6714 36 62.4714 36Z'
              fill='#FFFF2E'
            />
            <path
              d='M0 35.1C29.8044 35.1 34.245 35.1 52.3385 35.1V15.8538C52.3385 4.84616 45.9692 0 37.6615 0C32.7462 0 28.7308 1.86923 26.1692 5.46923C23.6077 1.86923 19.5231 0 14.6769 0C6.36923 0 0 4.84616 0 15.8538V35.1Z'
              fill='#FF4AA8'
            />
            <path
              d='M76.4288 5.8374C73.6069 9.01087 71.9808 13.3288 71.9808 18.4154C71.9808 23.5769 73.6587 27.5677 76.1801 30.4329C79.1582 27.2666 80.8868 22.9476 80.8868 18C80.8868 13.1918 79.2542 8.97724 76.4288 5.8374Z'
              fill='#F5FF2A'
            />
            <path
              d='M49.2428 5.07715C45.9712 8.28085 44.056 12.7922 44.056 18C44.056 24.6837 47.2106 30.2202 52.3385 33.3176V15.8538C52.3385 11.188 51.1941 7.62912 49.2428 5.07715Z'
              fill='#FF4A1E'
            />
          </svg>
        </div>
        <div className='moa -ml-2'>
          <svg
            width='109'
            height='36'
            viewBox='0 0 109 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M88.5269 36C93.4423 36 97.3192 33.6462 99.1192 29.4231V35.1H108.673V18.3462C108.673 7.13077 101.196 0 90.4654 0C79.5962 0 71.9808 7.40769 71.9808 18.4154C71.9808 30.3231 80.9115 36 88.5269 36Z'
              fill='#B8FFEA'
            />
            <path
              d='M62.4714 36C73.2714 36 80.8868 28.3846 80.8868 18C80.8868 7.61539 73.2714 0 62.4714 0C51.6714 0 44.056 7.61539 44.056 18C44.056 28.3846 51.6714 36 62.4714 36Z'
              fill='#FFFF2E'
            />
            <path
              d='M0 35.1C29.8044 35.1 34.245 35.1 52.3385 35.1V15.8538C52.3385 4.84616 45.9692 0 37.6615 0C32.7462 0 28.7308 1.86923 26.1692 5.46923C23.6077 1.86923 19.5231 0 14.6769 0C6.36923 0 0 4.84616 0 15.8538V35.1Z'
              fill='#FF4AA8'
            />
            <path
              d='M76.4288 5.8374C73.6069 9.01087 71.9808 13.3288 71.9808 18.4154C71.9808 23.5769 73.6587 27.5677 76.1801 30.4329C79.1582 27.2666 80.8868 22.9476 80.8868 18C80.8868 13.1918 79.2542 8.97724 76.4288 5.8374Z'
              fill='#F5FF2A'
            />
            <path
              d='M49.2428 5.07715C45.9712 8.28085 44.056 12.7922 44.056 18C44.056 24.6837 47.2106 30.2202 52.3385 33.3176V15.8538C52.3385 11.188 51.1941 7.62912 49.2428 5.07715Z'
              fill='#FF4A1E'
            />
          </svg>
        </div>
      </section>
      {message ? (
        <section className='mt-2'>
          <p className='text-sm text-white'>{message}</p>
        </section>
      ) : (
        <></>
      )}
    </section>
  );
}
