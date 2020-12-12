const DBConn = require('./../database/connection')
const bcrypt = require('bcrypt')

class User
{
    async store(props)
    {
        try
        {
            let hash = await bcrypt.hash(props.password, 10)

            let emailExists = await this.emailExists(props.email)

            if(emailExists.length)
            {
                return false
            }
            else
            {
                await DBConn.insert(
                    {
                        name: props.name,
                        email: props.email,
                        password: hash,
                        role: props.role
                    }
                ).table('users')

                return true
            }
        }
        catch (error)
        {
            console.log('\n[ userStoreError ]: ' + error + '\n')

            return false
        }
    }

    async emailExists(email)
    {
        try
        {
            let info = await DBConn.select('id').from('users').where( { email } )

            return info
        }
        catch (error)
        {
            console.log('\n[ verifyEmailExistsError ]: ' + error + '\n')

            return false
        }
    }
}

module.exports = new User()