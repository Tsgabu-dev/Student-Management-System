import { useState, type FormEvent } from 'react'
import Button from './components/common/Button'
import Card from './components/common/Card'
import Input from './components/common/Input'
import Select from './components/common/Select'
import './App.css'

function App() {
  const [isSaved, setIsSaved] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaved(true)
  }

  return (
    <main className="showcase">
      <header className="showcase__topbar">
        <div className="showcase__brand">
          <span className="showcase__mark" aria-hidden="true">U</span>
          <span>Student Management</span>
        </div>
        <span className="showcase__workspace">Admin workspace</span>
      </header>

      <div className="showcase__content">
        <div className="showcase__eyebrow">DESIGN SYSTEM / COMPONENTS</div>
        <h1 className="showcase__title">Interface building blocks</h1>
        <p className="showcase__intro">
          A first look at the shared controls for the administration panel.
        </p>

        <section className="showcase__section" aria-labelledby="buttons-heading">
          <div className="showcase__section-heading">
            <div>
              <h2 id="buttons-heading">Buttons</h2>
              <p>Actions and their available states</p>
            </div>
          </div>
          <div className="showcase__button-row">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Quiet action</Button>
            <Button variant="danger">Delete</Button>
          </div>
        </section>

        <div className="showcase__grid">
          <Card
            title="Student registration"
            description="Enter the student's basic information."
            action={<span className="showcase__required-note">* Required</span>}
          >
            <form className="student-form" onSubmit={handleSubmit} onChange={() => setIsSaved(false)}>
              <div className="student-form__fields">
                <Input
                  label="Student name"
                  name="studentName"
                  placeholder="e.g. Jordan Lee"
                  autoComplete="name"
                  required
                />
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="name@university.edu"
                  autoComplete="email"
                  hint="Use the student's university email."
                  required
                />
                <Select label="Department" name="department" defaultValue="" required>
                  <option value="" disabled>Select a department</option>
                  <option value="arts">Arts and Humanities</option>
                  <option value="business">Business</option>
                  <option value="engineering">Engineering</option>
                  <option value="science">Science</option>
                </Select>
                <Select label="Student status" name="status" defaultValue="active">
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </div>
              <div className="student-form__footer">
                {isSaved && <span className="student-form__success" role="status">Student details saved.</span>}
                <div className="student-form__actions">
                  <Button type="reset" variant="secondary">Clear</Button>
                  <Button type="submit">Save student</Button>
                </div>
              </div>
            </form>
          </Card>

          <Card
            title="Current academic year"
            description="The active period for registration and reporting."
            action={<span className="showcase__status">Active</span>}
            footer="Last updated August 12, 2026"
          >
            <div className="academic-summary">
              <span className="academic-summary__label">Academic year</span>
              <strong className="academic-summary__year">2026–2027</strong>
              <div className="academic-summary__divider" />
              <div className="academic-summary__term">
                <span>Current semester</span>
                <strong>Fall semester</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default App