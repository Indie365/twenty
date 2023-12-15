import { MenuItemMultiSelectAvatar } from "@/ui/navigation/menu-item/components/MenuItemMultiSelectAvatar";

export const MyComponent = () => {
  const imageUrl =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAYABgAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABgAAAAAQAAAGAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABSgAwAEAAAAAQAAABQAAAAA/8AAEQgAFAAUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMACwgICggHCwoJCg0MCw0RHBIRDw8RIhkaFBwpJCsqKCQnJy0yQDctMD0wJyc4TDk9Q0VISUgrNk9VTkZUQEdIRf/bAEMBDA0NEQ8RIRISIUUuJy5FRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRf/dAAQAAv/aAAwDAQACEQMRAD8Ava1q728otYY98joSCTgZrnbXWdTtrhrfVZXWLafmcAEkdgR/hVltQku9Q8+OIEBcGOT+ID0PY1ka1KH2u8ToqnPLbmIqG7u6LtbQ7RXBRec4Uck9eKXcPWsKDWVnhWSL5kYcFelSf2m3901POh8jP//QoyIAnTuKpXsY82NsksUyWPU5q/L9z8RVK++/F/uCsVsaEURwgA4HtT9x9TUcf3KfUGh//9k=";

  const handleSelectChange = (selected) => {
    console.log(`Item selected: ${selected}`);
  };

  return (
    <MenuItemMultiSelectAvatar
      avatar={<img src={imageUrl} alt="Avatar" />}
      text="First Option"
      selected={false}
      onSelectChange={handleSelectChange}
      className
    />
  );
};
