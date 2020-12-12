const DBConn = require('./../database/connection')
const bcrypt = require('bcrypt')

class User
{
    async all()
    {
        try
        {
            let all = await DBConn.select( ['id', 'name', 'email', 'role'] ).table('users')

            return { sttscode: 200, data: all, error: false, message: "executed" }
        }
        catch (error)
        {
            console.log('\n[ FindAllError ]: ' + error + '\n')
            return { sttscode: 500, data: null, error: true, message: `catchError: ${error}` }
        }
    }

    async findByID(id)
    {
        try
        {
            let user = await DBConn.select( ['id', 'name', 'email', 'role'] ).table('users').where( { id } )
            
            return { sttscode: 200, data: user, error: false, message: "executed" }
        }
        catch (error)
        {
            console.log('\n[ findByIDError ]: ' + error + '\n')
            return { sttscode: 500, data: null, error: true, message: `catchError: ${error}` }
        }
    }

    async create(props)
    {
        if (
            props.name != undefined
            && props.email != undefined
            && props.password != undefined
            && props.role != undefined
        )
        {
            try
            {
                let check = await this.verifyByEmail(props.email)

                if (check.commandexec)
                {
                    if (check.data.length)
                    {
                        return { sttscode: 400, data: null, error: true, message: "Já existe um usuário com o e-mail informado" }
                    }

                    const pwdHash = await bcrypt.hash(props.password, 10)

                    let row = await DBConn.insert(
                        {
                            name: props.name,
                            email: props.email,
                            password: pwdHash,
                            role: props.role
    
                        }
                    ).table('users')

                    return { sttscode: 201, data: row[ 0 ], error: false, message: "Usuário adicionado" }
                }
                else
                {
                    return { sttscode: 500, data: null, error: true, message: `verifyByEmailError: ${check.error}` }
                }
            }
            catch (error)
            {
                console.log('\n[ userStoreError ]: ' + error + '\n')
    
                return { sttscode: 500, data: null, error: true, message: `catchError: ${error}` }
            }
        }

        return { sttscode: 400, data: null, error: true, message: 'Informe: nome, email, senha e nível para um cadastro correto' }
    }

    async update(props)
    {
        if (props.id != undefined)
        {
            let user = await this.findByID( props.id )

            if (user.data.length)
            {
                try
                {
                    let update = await DBConn.update( { name: props.name, email: props.email, role: props.role} ).table('users').where({ id: props.id })

                    return { sttscode: 200, data: update, error: false, message: 'updated' }
                }
                catch (error)
                {
                    return { sttscode: 500, data: null, error: true, message: error }
                }
            }
            else
            {
                return { sttscode: 400, data: null, error: true, message: 'Nenhum usuário encontrado para o ID informado' }
            }
        }
        else
        {
            return { sttscode: 400, data: null, error: true, message: 'Informe um ID de usuário para executar a atualização' }
        }
    }

    async verifyByEmail(email)
    {
        try
        {
            let user = await DBConn.select('id').from('users').where( { email } )

            return { commandexec: true, data: user }
        }
        catch (error)
        {
            console.log('\n[ verifyByEmailError ]: ' + error + '\n')

            return { commandexec: false, data: null, error }
        }
    }

    async getByEmail(email)
    {
        try
        {
            let result = await DBConn.select( ['id', 'name', 'email', 'role'] ).table('users').where({ email })

            return { sttscode: 200, data: result, error: false, message: 'usuário encontrado' }
        }
        catch (error)
        {
            console.log('\n[ findByEmailError ]: ' + error + '\n')

            return { sttscode: 500, data: null, error: true, message: error }
        }
    }

    async delete(id)
    {
        if (id != undefined)
        {
            let user = await this.findByID(id)

            if (user.data.length)
            {
                let stmt = await DBConn.delete().table('users').where( {id} )

                return { sttscode: 200, data: stmt, error: false, message: 'deleted' }
            }
            else
            {
                return { sttscode: 400, data: null, error: true, message: 'Nenhum usuário encontrado para o ID informado' }
            }
        }
        else
        {
            return { sttscode: 400, data: null, error: true, message: 'Não é possível deletar sem um ID para a consulta' }
        }
    }
}

module.exports = new User()