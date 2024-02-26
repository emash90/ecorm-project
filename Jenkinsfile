pipeline {
  agent any
  stages {
    stage('start') {
      parallel {
        stage('start') {
          steps {
            echo 'build began'
          }
        }

        stage('parallel stage') {
          steps {
            sh 'console.log("running build for skin project")'
          }
        }

      }
    }

  }
}