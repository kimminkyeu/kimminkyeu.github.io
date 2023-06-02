import { slugifyTag } from "@/utils/helper";
import Link from "next/link";
import { PropertyTag } from "../api/type";

interface TagListProps {
    tagSet: Set<PropertyTag>;
}

export default function TagList({tagSet}: TagListProps) {
    const tagList = Array.from(tagSet);

    const renderTags = () => {
        return tagList.map((tag, i) => (
            <li key={i} className='m-2 text-neutral-500 text-sm'>
                <Link href={`/category/${slugifyTag(tag.name)}`} >
                    {tag.name}
                </Link>
            </li>
        ))
    }

    return (
        <div className="flex flex-col">
            <h3 className=" text-neutral-500 font-bold border-b-2 px-2 pb-1">Category</h3>
            <ul>{renderTags()}</ul>
        </div>
    );
}