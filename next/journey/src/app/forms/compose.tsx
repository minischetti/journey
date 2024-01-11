function Compose() {
    const formSubmit = (e: any) => {
        e.preventDefault();
        const newItem: Types.Item = {
            name: e.target.name.value,
            // description: e.target.description.value,
        };
        setItems([...items, newItem]);
    };
  return (
    <form onSubmit={formSubmit}>
        <input name="name" placeholder="Name" />
        <input name="tags" placeholder="Tags" />
        <button type="submit">Create</button>
    </form>
  );
}