import { LegacyRef, RefObject } from "react";
import { CategoryType } from "../../LiveChatPage";

type Props = {
  category: CategoryType,
  setCategoryId: Function,
  setChatHeader: Function,
  toggleShowCategories: Function,
  innerRef?: RefObject<HTMLLIElement>,
  last?: boolean
};

export default function Category({ category, setCategoryId, setChatHeader,
  toggleShowCategories, innerRef, last }: Props) {
  const chatHeader = `${category.unicode} ${category.title}`;

  const updateChat = (categoryId: string, chatHeader: string) => {
    setCategoryId(categoryId);
    setChatHeader(chatHeader);
    toggleShowCategories();
  }

  return (
    <li ref={innerRef as LegacyRef<HTMLLIElement>}
      onClick={() => { updateChat(category.id, chatHeader) }}
      className={`pl-3 hover:cursor-pointer ${!last ? "mb-6" : ""}`}>
      <h4>{chatHeader}</h4>
      <p className="font-thin font-[system-ui]">{category.description}</p>
    </li>
  );
}
