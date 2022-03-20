import React from 'react'
import ExpandableContent from '@/components/ExpandableContent'

const content = "这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本这是很长很长的一段文本"

function Other() {
  const handleClickParent = () => {
    console.log('父节点')
  }
  const handleClickChild = (e: any) => {
    e.stopPropagation()
    console.log('子节点')
  }
  return (
    <div style={{ width: 510 }}>
      {/* <ExpandableContent content={content} /> */}
      <div onClick={handleClickParent} style={{ width: 200, backgroundColor: '#999' }}>
        <span onClick={handleClickChild} style={{ backgroundColor: '#f00' }}>子节点</span>
      </div>
    </div>
  )
}

export default Other
