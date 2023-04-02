import { Pagination } from 'flowbite-react'

export default function Paginations({ postsPerPage, totalPosts, paginate, currentPage }: any) {
  const startItem = (currentPage - 1) * postsPerPage + 1
  const endItem = startItem - 1 + postsPerPage

  return (
    <div className="flex w-full items-center justify-between py-2">
      <div>
        <p className="text-sm text-gray-700 ">
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
      />
    </div>
  )
}
