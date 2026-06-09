import { faker } from '@faker-js/faker';

const Message = ({text}) => {
    const name = faker.person.fullName();

    return <>
     <p className = 'message'>
        {text} - {name}
     </p>
    </>;
}

export default Message;