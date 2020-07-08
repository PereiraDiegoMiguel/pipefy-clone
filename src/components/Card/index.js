import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import BoardContext from '../Board/context';
import { Container, Label } from './styles';
//problemas para serem tratados
//um card tem que ser arrastado por cima de outro card
//o card nao consegue ser arrastado para um lista vazia
// uma solucao seria arrastar card para o final da lista
//nao precisando passar por cima de outro card
//possivel solucao https://www.youtube.com/watch?v=-MfTv5VRM0A
function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  // card que recebe o outro card
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  //card que estou arrastando
  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }
      //peaga o tamnho do card
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedOffset < draggedOffset.y && draggedTop < targetCenter) {
        return;
      }
      if (draggedOffset > draggedOffset.y && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="" />}
    </Container>
  );
}

export default Card;