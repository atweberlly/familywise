import { Spinner, Table } from 'flowbite-react'

export default function TableLayout({ header, body, loader }: any) {
  return (
    <div>
      {loader ? (
        <Spinner aria-label="Loading" size="xl" />
      ) : (
        <Table hoverable={false} striped={true}>
          <Table.Head>{header}</Table.Head>
          <Table.Body className="divide-y">{body}</Table.Body>
        </Table>
      )}
    </div>
  )
}
