# Historias de usuario

## Usuario

- id : @unique

  - UUID V4

- name: @string @required

  - at least one name and one last name
  - at least 3 characters

- email: @string @required

  - at least 5 characters
  - valid email format Standard RFC 5322

- tagName : @string @unique

  - No spaces
  - No special characters
  - No numbers
  - at least 3 characters

- bio : @string

  - at least 50 characters
  - at most 500 characters

- password : @string @required

  - at least 8 characters
  - at most 20 characters
  - at least one number
  - at least one uppercase letter
  - at least one lowercase letter
  - at least one special character

- profilePicture : @string
  - type valid image (jpg, png, gif, svg)
