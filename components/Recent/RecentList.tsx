import { FlatList, Text } from 'react-native';
import RecentItem, { RecentItemProps } from './RecentItem';

export interface RecentListProps {
  words: { id: string; text: string }[];
}

function renderWords(itemData: {
  item: JSX.IntrinsicAttributes & RecentItemProps;
}) {
  return <RecentItem {...itemData.item} />;
}

function RecentList({ words }: RecentListProps) {
  return (
    <FlatList
      data={words}
      renderItem={renderWords}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default RecentList;
