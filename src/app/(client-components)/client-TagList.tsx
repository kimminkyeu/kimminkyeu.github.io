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
        <div className=" mr-8 w-40">
            <h3 className=" font-bold border-b-2 p-2">Category</h3>
            <ul>{renderTags()}</ul>
        </div>
    );
}