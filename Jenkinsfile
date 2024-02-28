pipeline {
  agent any
  stages {
    stage('checkout repo') {
      parallel {
        stage('checkout repo') {
          steps {
            git(url: 'https://github.com/emash90/ecorm-project.git', branch: 'develop')
          }
        }

        stage('list directories') {
          steps {
            sh 'ls -la'
          }
        }

      }
    }

  }
}