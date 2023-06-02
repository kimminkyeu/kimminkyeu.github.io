import { slugifyTag } from "@/utils/helper";
import Link from "next/link";
import { PropertyTag } from "../api/type";

interface TagListProps {
    tagMap?: Map<string, number>;
}

export default function TagList({tagMap}: TagListProps) {
    if (!tagMap) return;
    const tagList = Array.from(tagMap);

    const renderTags = () => {
        return tagList.map(([tag, count], i) => (
            <li key={i} className='m-2 text-neutral-500 text-sm'>
               { 
                    (tag === 'All') ? (
                    <Link href={`/}`}> {`${tag} (${count})`} </Link>
                ) : (
                    <Link href={`/category/${slugifyTag(tag)}`}>{`${tag} (${count})`}</Link>
                )
                }
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