# Historias de usuario

## Usuario

## uuid : @unique

> UUID V4

### name: @string @required

> at least one name and one last name<br/>
> at least 3 characters

### email: @string @required

> at least 5 characters <br />
> valid email format Standard RFC 5322 <br />

### tagName : @string @unique

> No spaces <br />
> No special characters <br />
> No numbers <br />
> at least 3 characters <br />

### bio : @string

> at least 50 characters <br />
> at most 500 characters

### password : @string @required

> at least 8 characters <br />
> at most 20 characters <br />
> at least one number <br />
> at least one uppercase letter <br />
> at least one lowercase letter <br />
> at least one special character <br />

- profilePicture : @string
  - type valid image (jpg, png, gif, svg)

## Publication

### uuid : @unique

> UUID V4

### title : @string @required

> at least 5 characters <br />
> at most 100 characters

### body : @string @required

> at least 50 characters <br />
> at most 500 characters

### image : @object

> type valid image (jpg, png, gif, svg)<br />
> at most 2MB<br />
> at most 2160px x 2160px<br />

### userId : @relation @required

> userId of the user who created the publication <br />
> userId should exist in the database

### likes : @number @default{ 0 }

> at least 0
> no number less than 0
> same number of length likesByUsers

### likes by users : @array @default{ [] }

> array of userIds <br />
> userIds should exist in the database <br />
> userIds should be unique <br />

### comments : @relation @required @array

### createdAt - updatedAt : @date @required
