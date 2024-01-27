import React, { useContext, useState } from "react";
import * as Types from "../../types";
import { ItemsContext } from "../../context/ItemsContext";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Tag } from "../ui/Tag";
import { Tags } from "../ui/Tags";
import { Status } from "../../types";

export function ComposeForm() {
    const [composeTitle, setComposeTitle] = useState("");
    const [composeDescription, setComposeDescription] = useState("");
    const [composeTags, setComposeTags] = useState<string[]>([]);
    const [composeStatus, setComposeStatus] = useState(Status.backlog);
    const [composeDate, setComposeDate] = useState<Date | null>(null);
    const [composeTime, setComposeTime] = useState<Date | null>(null);
    const { items, add, remove } = useContext(ItemsContext);

    const resetForm = () => {
        setComposeTitle("");
        setComposeDescription("");
        setComposeTags([]);
        setComposeStatus(Status.backlog);
        setComposeDate(null);
    };

    const setDateWithTime = (date: Date) => {
        if (composeTime) {
            const hours = composeTime.getHours();
            const minutes = composeTime.getMinutes();
            date.setHours(hours);
            date.setMinutes(minutes);
        }
        return date;
    }

    const formSubmit = (e: any) => {
        e.preventDefault();

        // TODO: validate form

        if (!e.target.name.value) {
            return;
        }
        const newItem: Types.Item = {
            id: Math.random().toString(36),
            name: e.target.name?.value || "",
            tags: composeTags || [],
            description: e.target.description?.value || "",
            status: e.target.status?.value || Status.backlog,
            date: setDateWithTime(composeDate || new Date()),
        };
        add(newItem)
        resetForm();
    };

    const updateTags = (e: any) => {
        e.preventDefault();
        const tag = e.target.value;
        if (!tag) {
            return;
        }
        const lastChar = tag.slice(-1);
        const isComma = lastChar === ",";
        const isSpace = lastChar === " ";
        const alreadyExists = composeTags.includes(tag.slice(0, -1));

        if (isComma || isSpace) {
            if (!alreadyExists) {
                setComposeTags((tags) => [...tags, tag.slice(0, -1)]);
            }
            e.target.value = "";
        }
    };

    const removeTag = (index: number) => () => {
        const newTags = [...composeTags];
        newTags.splice(index, 1);
        setComposeTags(newTags);
    };

    return (
        <form onSubmit={formSubmit} className="">
            <Input value={composeTitle} onChange={(e) => setComposeTitle(e.target.value)} name="name" label="name" placeholder="Enter a name..." />
            <Input
                value={composeDescription}
                onChange={(e) => setComposeDescription(e.target.value)}
                name="description"
                label="description"
                placeholder="Enter a description..."
            />
            <Select value={composeStatus} onChange={(e) => setComposeStatus(e.target.value)} name="status" label="status">
                {Object.values(Status).map((status, statusIndex) => (
                    <option key={statusIndex} value={status}>
                        {status}
                    </option>
                ))}
            </Select>
            <Input type="date" label="Date" name="date" placeholder="Enter a date..." onChange={(e) => setComposeDate(new Date(e.target.value))} />
            <Input label="Time" name="time" type="time" placeholder="Enter a time..." onChange={(e) => setComposeTime(new Date(e.target.value))} />
            <div>
                <Input label="Tags" name="tags" placeholder="Enter tags..." onChange={updateTags} />
                {composeTags && (
                    <Tags>
                        {composeTags.map((tag, tagIndex) => (
                            <Tag key={tagIndex} name={tag} onClose={removeTag(tagIndex)} />
                        ))}
                    </Tags>
                )}
            </div>
            <button type="submit" style={{ display: "none" }} />
        </form>
    );
}