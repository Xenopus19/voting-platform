import { Sequelize } from 'sequelize'
import { databaseUrl } from '../config'
import { Umzug, SequelizeStorage } from 'umzug'

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
})

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    console.log(err)
    return process.exit(1)
  }
}

export const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'src/migrations/*.ts',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}
