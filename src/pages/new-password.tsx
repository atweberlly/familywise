import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Title from '../components/Title'

export default function CreateNewPassword() {
  return (
    <div>
      <Title>Create New Password</Title>
      <div className="invisible absolute right-0 top-0 m-auto mt-0 block p-8 text-right md:visible">
        <Button href="#" className="m-auto block text-right" color="primary">
          Sign in
        </Button>
      </div>
      <div className="display max-h-screen md:max-h-fit">
        <div className="base m-auto mt-9 block max-h-screen max-w-full rounded-3xl bg-white p-7 text-base shadow-sm md:max-h-fit md:max-w-md lg:mt-48">
          <div className="top-2 lg:absolute lg:top-14 lg:mb-10">
            <Heading size={4} className="text-center">
              {' '}
              Create New Password
            </Heading>
            <p className="base lg:text-md my-3 mt-5 text-center md:mt-6">
              Please create a new password that you don’t use on<br></br> any other site.{' '}
            </p>
          </div>
          <form>
            <div className="mb-4">
              <Input label={'New Password'} type={'password'} placeholder={'•••••••••'}></Input>
            </div>
            <div className="mb-4">
              <Input
                label={'Confirm New Password'}
                type={'password'}
                placeholder={'•••••••••'}
              ></Input>
            </div>
            <div className="mt-7">
              <Button href="" className="w-full" color="dark">
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
