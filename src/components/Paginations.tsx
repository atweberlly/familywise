import { Pagination } from 'flowbite-react'

export default function Paginations({ postsPerPage, totalPosts, paginate, currentPage }: any) {
  const startItem = (currentPage - 1) * postsPerPage + 1
  const endItem = startItem - 1 + postsPerPage

  return (
    <div className="flex w-full items-center justify-between py-2">
      <div>
        <p className="text-sm text-gray-700 dark:text-white">
          Showing <span className="font-medium">{startItem} </span>
          to <span className="font-medium"> {endItem > totalPosts ? totalPosts : endItem} </span>
          of
          <span className="font-medium"> {totalPosts} </span>
          results
        </p>
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={paginate}
        showIcons={true}
        totalPages={Math.ceil(totalPosts / postsPerPage)}
        theme={{
          base: '',
          layout: {
            table: {
              base: 'text-sm text-gray-700 dark:text-gray-400',
              span: 'font-semibold text-gray-900 dark:text-white',
            },
          },
          pages: {
            base: 'xs:mt-0 mt-2 inline-flex items-center -space-x-px',
            showIcon: 'inline-flex',
            previous: {
              base: 'ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
              icon: 'h-5 w-5',
            },
            next: {
              base: 'rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
              icon: 'h-5 w-5',
            },
            selector: {
              base: 'w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
              active:
                'bg-orange-500 text-white hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
              disabled: 'opacity-50 cursor-normal',
            },
          },
        }}
      />
    </div>
  )
}
