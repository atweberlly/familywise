type Props = {
  /**
   * Drag ID.
   */
  id: string

  /**
   * Dragged Children.
   */
  children: React.ReactNode

  /**
   * Dragging item.
   */
  item?: object

  /**
   * On drag start for the dragging element.
   */
  onDragStart?: (event: any, item: any) => void

  /**
   * On drop dragging element.
   */
  onDrop?: (event: any, item: any) => void
}

export default function Draggable({
  children,
  id,
  item = {},
  onDragStart = (event, item) => {},
  onDrop = (event, item) => {},
}: Props) {
  const handleDrag = (ev: any) => {
    onDragStart(ev, item)
  }

  const handleDrop = (ev: any) => {
    onDrop(ev, item)
  }

  return (
    <div
      draggable={true}
      id={id}
      onDragOver={(ev) => ev.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
      className="animate-[animation-move]"
    >
      {children}
    </div>
  )
}
